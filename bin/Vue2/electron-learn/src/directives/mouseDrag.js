"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MouseDragDirective = {
    mounted: function (el, binding) {
        var handler = binding.value;
        var isDown = false;
        var baseX = 0;
        var baseY = 0;
        el.addEventListener('mousedown', function (e) {
            isDown = true;
            baseX = e.x;
            baseY = e.y;
        });
        document.addEventListener('mousemove', function (e) {
            if (isDown) {
                var x = e.screenX - baseX;
                var y = e.screenY - baseY;
                handler({ x: x, y: y });
            }
        });
        document.addEventListener('mouseup', function () {
            isDown = false;
        });
    }
};
exports.default = MouseDragDirective;
