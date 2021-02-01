const Task = require('laravel-mix/src/tasks/Task');
const FileCollection = require('laravel-mix/src/FileCollection')
const path = require("path");
const fs = require("fs");
let Log = require('laravel-mix/src/Log');

class HandlebarTask extends Task {

    run() {
        this.isHbsUpdate = false;
        this.files = new FileCollection(this.data.src);
        this.precompile();
    }

    onChange(updatedFile) {
        this.isHbsUpdate = true;
        this.precompile();
        Log.line(`Update ${updatedFile}`);
    }

    precompile() {
        const params = this.data;

        this.src = process.cwd() + '/' + params.src;
        this.dist = process.cwd() + '/' + params.dist;
        this.variables = params.variables;

        const cwd = process.cwd();
        this.Handlebars = require('handlebars');
        this.layouts = require('handlebars-layouts');
        this.glob = require('glob');

        process.chdir(this.src)
        this.compile();
        process.chdir(cwd);
    }

    compile() {
        this.registerHelper();
        this.registerPartial();
        this.render()
    }

    render() {
        const templates = this.glob.sync('**/[^_]*.hbs');
        for (const file of templates) {
            try {
                const parsed = path.parse(file);
                parsed.base = parsed.name + ".html";
                const content = fs.readFileSync(file, "utf8");
                const template = this.Handlebars.compile(content);
                const rendered = template(this.variables);
                const outdir = this.dist + path.sep + parsed.dir;

                if (!fs.existsSync(outdir)) {
                    fs.mkdirSync(outdir, { recursive: true });
                }

                fs.writeFileSync(outdir + "/" + parsed.name + ".html", rendered);
            } catch (e) {
                throw new Error(
                    `could not render template ${file}: ${e.message || e}`
                );
            }
        }
    }

    registerPartial() {
        const partials = this.glob.sync('**/_*.hbs');
        for (const file of partials) {
            try {
                const parsed = path.parse(file);
                parsed.name = parsed.name.substr(1);
                const partialName =
                    parsed.dir === ""
                        ? parsed.name
                        : parsed.dir + "/" + parsed.name;

                if (! this.isHbsUpdate) {
                    Log.feedback(` - register partial ${file} as ${partialName}`);
                }

                const tpl = fs.readFileSync(file, "utf8");
                this.Handlebars.registerPartial(partialName, tpl);
            } catch (e) {
                throw new Error(
                    `could not register partial ${file}: ${e.message || e}`
                );
            }
        }
    }

    registerHelper() {
        this.Handlebars.registerHelper(this.layouts(this.Handlebars));
    }
}

module.exports = HandlebarTask;
