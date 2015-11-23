describe("CSS Parser", function() {
    var parser = new Html2Bem();
    parser.indentLength = 1;
    parser.outputLanguage = 'css';
    parser.indentType = "spaces";

    it("Single CSS class", function () {
        parser.inputCodeToParse = '<div class="lorem"></div>';
        var output = parser.findCssClasses();
        expect(output).toBe(".lorem {}\n");
    });

    it("Multiple CSS classes", function () {
        parser.inputCodeToParse = '<div class="lorem ipsum dolor"></div>';
        var output = parser.findCssClasses();
        expect(output).toBe(".dolor {}\n.ipsum {}\n.lorem {}\n");
    });

    it("BEM elements in blocks", function () {
        parser.inputCodeToParse = '<div class="header"><div class="header__logo"></div></div>';
        var output = parser.findCssClasses();
        expect(output).toBe(".header {}\n.header__logo {}\n");
    });

    it("BEM modifiers in blocks and elements", function () {
        parser.inputCodeToParse = '<div class="header header--beta"><div class="header__logo header__logo--beta"></div></div>';
        var output = parser.findCssClasses();
        expect(output).toBe(".header {}\n.header--beta {}\n.header__logo {}\n.header__logo--beta {}\n");
    });

    it("Multiple elements", function () {
        parser.inputCodeToParse = '<div class="header"><div class="header__logo"></div></div><div class="content"><div class="content__section"></div></div>';
        var output = parser.findCssClasses();
        expect(output).toBe(".content {}\n.content__section {}\n.header {}\n.header__logo {}\n");
    });
});
