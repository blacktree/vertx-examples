var Router = require("vertx-web-js/router");
var HandlebarsTemplateEngine = require("vertx-web-js/handlebars_template_engine");

// To simplify the development of the web components we use a Router to route all HTTP requests
// to organize our code in a reusable way.
var router = Router.router(vertx);

// In order to use a template we first need to create an engine
var engine = HandlebarsTemplateEngine.create();

// Entry point to the application, this will render a custom template.
router.get().handler(function (ctx) {
  // we define a hardcoded title for our application
  ctx.put("name", "Vert.x Web");

  // and now delegate to the engine to render it.
  engine.render(ctx, "templates/index.hbs", function (res, res_err) {
    if (res_err == null) {
      ctx.response().end(res);
    } else {
      ctx.fail(res_err);
    }
  });
});

// start a HTTP web server on port 8080
vertx.createHttpServer().requestHandler(router.accept).listen(8080);
