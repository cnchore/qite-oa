export function isObject(obj) {
  return typeof obj === 'object' && obj !== null;
}
export function isFunction(fn) {
  return typeOf(fn) === 'function';
}
export function isNumber(num) {
  return typeof num === 'number' && !isNaN(num);
}
export function inArray(value, arr) {
  let index = -1;

  if (arr.indexOf) {
    return arr.indexOf(value);
  }

  arr.forEach((n, i) => {
    if (n === value) {
      index = i;
    }
  });

  return index;
}
export function each(obj, callback) {
  if (obj && isFunction(callback)) {
    let i;

    if (isArray(obj) || isNumber(obj.length)/* array-like */) {
      const length = obj.length;

      for (i = 0; i < length; i += 1) {
        if (callback.call(obj, obj[i], i, obj) === false) {
          break;
        }
      }
    } else if (isObject(obj)) {
      Object.keys(obj).forEach((key) => {
        callback.call(obj, obj[key], key, obj);
      });
    }
  }

  return obj;
}
export function getEvent(event) {
  const e = event || window.event;

  // Fix target property (IE8)
  if (!e.target) {
    e.target = e.srcElement || document;
  }

  if (!isNumber(e.pageX) && isNumber(e.clientX)) {
    const eventDoc = event.target.ownerDocument || document;
    const doc = eventDoc.documentElement;
    const body = eventDoc.body;

    e.pageX = e.clientX + (
      ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
      ((doc && doc.clientLeft) || (body && body.clientLeft) || 0)
    );
    e.pageY = e.clientY + (
      ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
      ((doc && doc.clientTop) || (body && body.clientTop) || 0)
    );
  }

  return e;
}
export function getPointer(pointer, endOnly) {
  const end = {
    endX: pointer.pageX,
    endY: pointer.pageY,
  };

  if (endOnly) {
    return end;
  }

  return extend({
    startX: pointer.pageX,
    startY: pointer.pageY,
  }, end);
}
export function extend(obj, ...args) {
  if (isObject(obj) && args.length > 0) {
    if (Object.assign) {
      return Object.assign(obj, ...args);
    }

    args.forEach((arg) => {
      if (isObject(arg)) {
        Object.keys(arg).forEach((key) => {
          obj[key] = arg[key];
        });
      }
    });
  }

  return obj;
}