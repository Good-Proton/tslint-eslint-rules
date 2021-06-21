"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./helper");
var rule = 'no-ex-assign';
var scripts = {
    valid: [
        'try { } catch (e) { three = 2 + 1; }',
        'try { } catch ({e}) { this.something = 2; }", ecmaFeatures: { destructuring: true } }',
        'function foo() { try { } catch (e) { return false; } }',
        "\n    import {Aurelia} from \"aurelia-framework\";\n    import {bootstrap} from \"aurelia-bootstrapper\";\n    import {TemplateRegistryEntry, Loader} from \"aurelia-loader\";\n    import {TextTemplateLoader} from \"aurelia-loader-default\";\n\n    declare var frontendConfig: { translate: string, debug: boolean };\n\n    (<any>TextTemplateLoader).prototype.standardLoadTemplate = TextTemplateLoader.prototype.loadTemplate;\n    TextTemplateLoader.prototype.loadTemplate = function(loader: Loader, entry: TemplateRegistryEntry): Promise<any> {\n        entry.address += \"?translate=\" + frontendConfig.language;\n        return (<any>this).standardLoadTemplate(loader, entry);\n    };\n\n    export function bootstrapComponents(): void {\n        \"use strict\";\n\n        let paths: string[] = [];\n        for (let i = 0; i < arguments.length; i++) {\n            let component: string = arguments[i];\n            paths.push(\"frontend/components/\" + component + \"/\" + component);\n        }\n\n        bootstrap((aurelia: Aurelia) => { // line 23\n            aurelia.use\n                .defaultBindingLanguage()\n                .defaultResources()\n                .developmentLogging()\n                .globalResources(paths);\n\n            aurelia.start().then(()  => aurelia.enhance({}, document.body));\n        });\n    }\n    ",
        "\n    import {Component} from '@angular/core';\n\n    @Component({\n\n    })\n    export class App {\n    }\n    ",
        "\n    describe(\"The Basic Config\", (): void => {\n        it(\"shall have specific properties attached to it.\", (done: (error?: Error) => void): void => {\n            chai.expect(config).to.contain.all.keys([\"extends\", \"rules\", \"rulesDirectory\"]);\n\n            chai.expect(config.extends).to.be.an(\"array\");\n            chai.expect(config.rulesDirectory).to.be.an(\"array\");\n            chai.expect(config.rules).to.be.an(\"object\");\n\n            done();\n        });\n    });\n    ",
        'try {} catch (err) { if (err instanceof Foo) {} }',
        'try {} catch (err) { if (err == err) {} }',
        'try {} catch (err) { if (err === err) {} }'
    ],
    invalid: [
        'try { } catch (e) { e = 10; }',
        'try { } catch (e) { e += 10; }',
        'try { } catch (e) { e -= 10; }',
        'try { } catch (ex) { ex = 10; }',
        'try { } catch (ex) { [ex] = []; }',
        'try { } catch (ex) { ({x: ex = 0}) = {}; }',
        "\n    import {Component} from '@angular/core';\n\n    @Component({\n    })\n    export class MyApp {\n      public hi() {\n        try {\n          console.log('Hello World');\n        }\n        catch (e) {\n          // Hi\n          let z = 'xxxx';\n          e = 2;\n          let x = e;\n          z.toString();\n          z = 'gfdg';\n          console.log('Done!', x, z);\n          console.log(e);\n        }\n      }\n    }\n    "
    ]
};
describe(rule, function test() {
    it('should pass when not assigning a value to exception', function testValid() {
        helper_1.makeTest(rule, scripts.valid, true);
    });
    it('should fail when assigning a value to exception', function testInvalid() {
        helper_1.makeTest(rule, scripts.invalid, false);
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvbm9FeEFzc2lnblJ1bGVUZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG1DQUFvQztBQUVwQyxJQUFNLElBQUksR0FBRyxjQUFjLENBQUM7QUFDNUIsSUFBTSxPQUFPLEdBQUc7SUFDZCxLQUFLLEVBQUU7UUFDTCxzQ0FBc0M7UUFDdEMsdUZBQXVGO1FBQ3ZGLHdEQUF3RDtRQUN4RCxxMENBaUNDO1FBQ0QsbUhBUUM7UUFDRCx3ZkFZQztRQUNELG1EQUFtRDtRQUNuRCwyQ0FBMkM7UUFDM0MsNENBQTRDO0tBQzdDO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsK0JBQStCO1FBQy9CLGdDQUFnQztRQUNoQyxnQ0FBZ0M7UUFDaEMsaUNBQWlDO1FBQ2pDLG1DQUFtQztRQUNuQyw0Q0FBNEM7UUFDNUMsd2JBc0JDO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsUUFBUSxDQUFDLElBQUksRUFBRSxTQUFTLElBQUk7SUFDMUIsRUFBRSxDQUFDLHFEQUFxRCxFQUFFLFNBQVMsU0FBUztRQUMxRSxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGlEQUFpRCxFQUFFLFNBQVMsV0FBVztRQUN4RSxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9ydWxlcy9ub0V4QXNzaWduUnVsZVRlc3RzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy92eWFjaGVzbGF2ZG9yemhpZXYvRGVza3RvcC9wcm9qZWN0cy9AbGlua2VkLWhlbHBlci90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
