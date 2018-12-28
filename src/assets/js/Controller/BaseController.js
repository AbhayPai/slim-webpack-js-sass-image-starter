export default function BaseController() {
    this.register = function(controller) {
        if (controller.render) {
            controller.render(controller);
        }

        if (controller.preprocess) {
            controller.preprocess(controller);
        }

        if (controller.ready) {
            controller.ready(controller);
        }

        document.onreadystatechange = function() {
            if (document.readyState === 'interactive' && controller.interactive) {
                controller.interactive(controller);
            }

            if (document.readyState === 'complete' && controller.interactive) {
                controller.complete(controller);
            }
        };
    };
}
