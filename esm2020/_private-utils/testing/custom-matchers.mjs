const _global = (typeof window === 'undefined' ? global : window);
import { _dom as _ } from './dom-tools';
import { applyCssPrefixes, extendObject, } from '@angular/flex-layout/_private-utils';
export const expect = _global.expect;
/**
 * NOTE: These custom JASMINE Matchers are used only
 *       in the Karma/Jasmine testing for the Layout Directives
 *       in `src/lib/flex/api`
 */
export const customMatchers = {
    toEqual: function (util) {
        return {
            compare: function (actual, expected) {
                return { pass: util.equals(actual, expected) };
            }
        };
    },
    toHaveText: function () {
        return {
            compare: function (actual, expectedText) {
                const actualText = elementText(actual);
                return {
                    pass: actualText == expectedText,
                    get message() {
                        return 'Expected ' + actualText + ' to be equal to ' + expectedText;
                    }
                };
            }
        };
    },
    toHaveCssClass: function () {
        return { compare: buildError(false), negativeCompare: buildError(true) };
        function buildError(isNot) {
            return function (actual, className) {
                return {
                    pass: _.hasClass(actual, className) == !isNot,
                    get message() {
                        return `
              Expected ${actual.outerHTML} ${isNot ? 'not ' : ''}
              to contain the CSS class '${className}'
            `;
                    }
                };
            };
        }
    },
    toHaveMap: function () {
        return {
            compare: function (actual, map) {
                let allPassed;
                allPassed = Object.keys(map).length !== 0;
                Object.keys(map).forEach(key => {
                    allPassed = allPassed && (actual[key] === map[key]);
                });
                return {
                    pass: allPassed,
                    get message() {
                        return `
              Expected ${JSON.stringify(actual)} ${!allPassed ? ' ' : 'not '} to contain the
              '${JSON.stringify(map)}'
            `;
                    }
                };
            }
        };
    },
    toHaveAttributes: function () {
        return {
            compare: function (actual, map) {
                let allPassed;
                let attributeNames = Object.keys(map);
                allPassed = attributeNames.length !== 0;
                attributeNames.forEach(name => {
                    allPassed = allPassed && _.hasAttribute(actual, name)
                        && _.getAttribute(actual, name) === map[name];
                });
                return {
                    pass: allPassed,
                    get message() {
                        return `
              Expected ${actual.outerHTML} ${allPassed ? 'not ' : ''} attributes to contain
              '${JSON.stringify(map)}'
            `;
                    }
                };
            }
        };
    },
    /**
     * Check element's inline styles only
     */
    toHaveStyle: function () {
        return {
            compare: buildCompareStyleFunction(true)
        };
    },
    /**
     * Check element's css stylesheet only (if not present inline)
     */
    toHaveCSS: function () {
        return {
            compare: buildCompareStyleFunction(false)
        };
    }
};
/**
 * Curried value to function to check styles that are inline or in a stylesheet for the
 * specified DOM element.
 */
function buildCompareStyleFunction(inlineOnly = true) {
    return function (actual, styles, styler) {
        const found = {};
        const styleMap = {};
        if (typeof styles === 'string') {
            styleMap[styles] = '';
        }
        else {
            Object.assign(styleMap, styles);
        }
        let allPassed = Object.keys(styleMap).length !== 0;
        Object.keys(styleMap).forEach(prop => {
            let { elHasStyle, current } = hasPrefixedStyles(actual, prop, styleMap[prop], inlineOnly, styler);
            allPassed = allPassed && elHasStyle;
            if (!elHasStyle) {
                extendObject(found, current);
            }
        });
        return {
            pass: allPassed,
            get message() {
                const expectedValueStr = (typeof styles === 'string') ? styleMap :
                    JSON.stringify(styleMap, null, 2);
                const foundValueStr = inlineOnly ? actual.outerHTML : JSON.stringify(found);
                return `
          Expected ${foundValueStr}${!allPassed ? '' : ' not'} to contain the
          CSS ${typeof styles === 'string' ? 'property' : 'styles'} '${expectedValueStr}'
        `;
            }
        };
    };
}
/**
 * Validate presence of requested style or use fallback
 * to possible `prefixed` styles. Useful when some browsers
 * (Safari, IE, etc) will use prefixed style instead of defaults.
 */
function hasPrefixedStyles(actual, key, value, inlineOnly, styler) {
    const current = {};
    if (value === '*') {
        return { elHasStyle: styler.lookupStyle(actual, key, inlineOnly) !== '', current };
    }
    value = value.trim();
    let elHasStyle = styler.lookupStyle(actual, key, inlineOnly) === value;
    if (!elHasStyle) {
        let prefixedStyles = applyCssPrefixes({ [key]: value });
        Object.keys(prefixedStyles).forEach(prop => {
            // Search for optional prefixed values
            elHasStyle = elHasStyle ||
                styler.lookupStyle(actual, prop, inlineOnly) === prefixedStyles[prop];
        });
    }
    // Return BOTH confirmation and current computed key values (if confirmation == false)
    return { elHasStyle, current };
}
function elementText(n) {
    const hasNodes = (m) => {
        const children = _.childNodes(m);
        return children && children['length'];
    };
    if (n instanceof Array) {
        return n.map(elementText).join('');
    }
    if (_.isCommentNode(n)) {
        return '';
    }
    if (_.isElementNode(n) && _.tagName(n) == 'CONTENT') {
        return elementText(Array.prototype.slice.apply(_.getDistributedNodes(n)));
    }
    if (_.hasShadowRoot(n)) {
        return elementText(_.childNodesAsList(_.getShadowRoot(n)));
    }
    if (hasNodes(n)) {
        return elementText(_.childNodesAsList(n));
    }
    return _.getText(n);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLW1hdGNoZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9fcHJpdmF0ZS11dGlscy90ZXN0aW5nL2N1c3RvbS1tYXRjaGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQSxNQUFNLE9BQU8sR0FBUSxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUV2RSxPQUFPLEVBQUMsSUFBSSxJQUFJLENBQUMsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUV0QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsWUFBWSxHQUFHLE1BQU0scUNBQXFDLENBQUM7QUFHckYsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFzQyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBMER4RTs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFtQztJQUU1RCxPQUFPLEVBQUUsVUFBVSxJQUFJO1FBQ3JCLE9BQU87WUFDTCxPQUFPLEVBQUUsVUFBVSxNQUFXLEVBQUUsUUFBYTtnQkFDM0MsT0FBTyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsRUFBQyxDQUFDO1lBQy9DLENBQUM7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELFVBQVUsRUFBRTtRQUNWLE9BQU87WUFDTCxPQUFPLEVBQUUsVUFBVSxNQUFXLEVBQUUsWUFBb0I7Z0JBQ2xELE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdkMsT0FBTztvQkFDTCxJQUFJLEVBQUUsVUFBVSxJQUFJLFlBQVk7b0JBQ2hDLElBQUksT0FBTzt3QkFDVCxPQUFPLFdBQVcsR0FBRyxVQUFVLEdBQUcsa0JBQWtCLEdBQUcsWUFBWSxDQUFDO29CQUN0RSxDQUFDO2lCQUNGLENB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QUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzVEO0lBRUQsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDZixPQUFPLFdBQVcsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMzQztJQUVELE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5kZWNsYXJlIHZhciBnbG9iYWw6IGFueTtcbmNvbnN0IF9nbG9iYWwgPSA8YW55Pih0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvdyk7XG5cbmltcG9ydCB7X2RvbSBhcyBffSBmcm9tICcuL2RvbS10b29scyc7XG5cbmltcG9ydCB7YXBwbHlDc3NQcmVmaXhlcywgZXh0ZW5kT2JqZWN0LCB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0L19wcml2YXRlLXV0aWxzJztcbmltcG9ydCB7U3R5bGVVdGlsc30gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQvY29yZSc7XG5cbmV4cG9ydCBjb25zdCBleHBlY3Q6IChhY3R1YWw6IGFueSkgPT4gTmdNYXRjaGVycyA9IDxhbnk+IF9nbG9iYWwuZXhwZWN0O1xuXG4vKipcbiAqIEphc21pbmUgbWF0Y2hlcnMgdGhhdCBjaGVjayBBbmd1bGFyIHNwZWNpZmljIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdNYXRjaGVycyBleHRlbmRzIGphc21pbmUuTWF0Y2hlcnM8YW55PiB7XG4gIC8qKlxuICAgKiBFeHBlY3QgdGhlIGVsZW1lbnQgdG8gaGF2ZSBleGFjdGx5IHRoZSBnaXZlbiB0ZXh0LlxuICAgKlxuICAgKiAjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9IYXZlVGV4dCd9XG4gICAqL1xuICB0b0hhdmVUZXh0KGV4cGVjdGVkOiBzdHJpbmcpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBDb21wYXJlIGtleTp2YWx1ZSBwYWlycyBhcyBtYXRjaGluZyBFWEFDVExZXG4gICAqL1xuICB0b0hhdmVNYXAoZXhwZWN0ZWQ6IHsgW2s6IHN0cmluZ106IHN0cmluZyB9KTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRXhwZWN0IHRoZSBlbGVtZW50IHRvIGhhdmUgdGhlIGdpdmVuIENTUyBjbGFzcy5cbiAgICpcbiAgICogIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvSGF2ZUNzc0NsYXNzJ31cbiAgICovXG4gIHRvSGF2ZUNzc0NsYXNzKGV4cGVjdGVkOiBzdHJpbmcpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgdGhlIGVsZW1lbnQgdG8gaGF2ZSB0aGUgZ2l2ZW4gcGFpcnMgb2YgYXR0cmlidXRlIG5hbWUgYW5kIGF0dHJpYnV0ZSB2YWx1ZVxuICAgKi9cbiAgdG9IYXZlQXR0cmlidXRlcyhleHBlY3RlZDogeyBbazogc3RyaW5nXTogc3RyaW5nIH0pOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgdGhlIGVsZW1lbnQgdG8gaGF2ZSB0aGUgZ2l2ZW4gQ1NTIHN0eWxlcyBpbmplY3RlZCBJTkxJTkVcbiAgICpcbiAgICogIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvSGF2ZVN0eWxlJ31cbiAgICovXG4gIHRvSGF2ZVN0eWxlKGV4cGVjdGVkOiB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfSB8IHN0cmluZyk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4cGVjdCB0aGUgZWxlbWVudCB0byBoYXZlIHRoZSBnaXZlbiBDU1MgaW5saW5lIE9SIGNvbXB1dGVkIHN0eWxlcy5cbiAgICpcbiAgICogIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvSGF2ZVN0eWxlJ31cbiAgICovXG4gIHRvSGF2ZVN0eWxlKGV4cGVjdGVkOiB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfSB8IHN0cmluZyk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEludmVydCB0aGUgbWF0Y2hlcnMuXG4gICAqL1xuICBub3Q6IE5nTWF0Y2hlcnM7XG59XG5cbi8qKlxuICogTk9URTogVGhlc2UgY3VzdG9tIEpBU01JTkUgTWF0Y2hlcnMgYXJlIHVzZWQgb25seVxuICogICAgICAgaW4gdGhlIEthcm1hL0phc21pbmUgdGVzdGluZyBmb3IgdGhlIExheW91dCBEaXJlY3RpdmVzXG4gKiAgICAgICBpbiBgc3JjL2xpYi9mbGV4L2FwaWBcbiAqL1xuZXhwb3J0IGNvbnN0IGN1c3RvbU1hdGNoZXJzOiBqYXNtaW5lLkN1c3RvbU1hdGNoZXJGYWN0b3JpZXMgPSB7XG5cbiAgdG9FcXVhbDogZnVuY3Rpb24gKHV0aWwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29tcGFyZTogZnVuY3Rpb24gKGFjdHVhbDogYW55LCBleHBlY3RlZDogYW55KSB7XG4gICAgICAgIHJldHVybiB7cGFzczogdXRpbC5lcXVhbHMoYWN0dWFsLCBleHBlY3RlZCl9O1xuICAgICAgfVxuICAgIH07XG4gIH0sXG5cbiAgdG9IYXZlVGV4dDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb21wYXJlOiBmdW5jdGlvbiAoYWN0dWFsOiBhbnksIGV4cGVjdGVkVGV4dDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGFjdHVhbFRleHQgPSBlbGVtZW50VGV4dChhY3R1YWwpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHBhc3M6IGFjdHVhbFRleHQgPT0gZXhwZWN0ZWRUZXh0LFxuICAgICAgICAgIGdldCBtZXNzYWdlKCkge1xuICAgICAgICAgICAgcmV0dXJuICdFeHBlY3RlZCAnICsgYWN0dWFsVGV4dCArICcgdG8gYmUgZXF1YWwgdG8gJyArIGV4cGVjdGVkVGV4dDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSxcblxuICB0b0hhdmVDc3NDbGFzczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7Y29tcGFyZTogYnVpbGRFcnJvcihmYWxzZSksIG5lZ2F0aXZlQ29tcGFyZTogYnVpbGRFcnJvcih0cnVlKX07XG5cbiAgICBmdW5jdGlvbiBidWlsZEVycm9yKGlzTm90OiBib29sZWFuKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGFjdHVhbDogYW55LCBjbGFzc05hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHBhc3M6IF8uaGFzQ2xhc3MoYWN0dWFsLCBjbGFzc05hbWUpID09ICFpc05vdCxcbiAgICAgICAgICBnZXQgbWVzc2FnZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICAgIEV4cGVjdGVkICR7YWN0dWFsLm91dGVySFRNTH0gJHtpc05vdCA/ICdub3QgJyA6ICcnfVxuICAgICAgICAgICAgICB0byBjb250YWluIHRoZSBDU1MgY2xhc3MgJyR7Y2xhc3NOYW1lfSdcbiAgICAgICAgICAgIGA7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfTtcbiAgICB9XG4gIH0sXG5cbiAgdG9IYXZlTWFwOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uIChhY3R1YWw6IHsgW2s6IHN0cmluZ106IHN0cmluZyB9LCBtYXA6IHsgW2s6IHN0cmluZ106IHN0cmluZyB9KSB7XG4gICAgICAgIGxldCBhbGxQYXNzZWQ6IGJvb2xlYW47XG4gICAgICAgIGFsbFBhc3NlZCA9IE9iamVjdC5rZXlzKG1hcCkubGVuZ3RoICE9PSAwO1xuICAgICAgICBPYmplY3Qua2V5cyhtYXApLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBhbGxQYXNzZWQgPSBhbGxQYXNzZWQgJiYgKGFjdHVhbFtrZXldID09PSBtYXBba2V5XSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcGFzczogYWxsUGFzc2VkLFxuICAgICAgICAgIGdldCBtZXNzYWdlKCkge1xuICAgICAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgICAgRXhwZWN0ZWQgJHtKU09OLnN0cmluZ2lmeShhY3R1YWwpfSAkeyFhbGxQYXNzZWQgPyAnICcgOiAnbm90ICd9IHRvIGNvbnRhaW4gdGhlXG4gICAgICAgICAgICAgICcke0pTT04uc3RyaW5naWZ5KG1hcCl9J1xuICAgICAgICAgICAgYDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfSxcblxuICB0b0hhdmVBdHRyaWJ1dGVzOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uIChhY3R1YWw6IGFueSwgbWFwOiB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfSkge1xuICAgICAgICBsZXQgYWxsUGFzc2VkOiBib29sZWFuO1xuICAgICAgICBsZXQgYXR0cmlidXRlTmFtZXMgPSBPYmplY3Qua2V5cyhtYXApO1xuICAgICAgICBhbGxQYXNzZWQgPSBhdHRyaWJ1dGVOYW1lcy5sZW5ndGggIT09IDA7XG4gICAgICAgIGF0dHJpYnV0ZU5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgICAgYWxsUGFzc2VkID0gYWxsUGFzc2VkICYmIF8uaGFzQXR0cmlidXRlKGFjdHVhbCwgbmFtZSlcbiAgICAgICAgICAgICAgJiYgXy5nZXRBdHRyaWJ1dGUoYWN0dWFsLCBuYW1lKSA9PT0gbWFwW25hbWVdO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwYXNzOiBhbGxQYXNzZWQsXG4gICAgICAgICAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgICBFeHBlY3RlZCAke2FjdHVhbC5vdXRlckhUTUx9ICR7YWxsUGFzc2VkID8gJ25vdCAnIDogJyd9IGF0dHJpYnV0ZXMgdG8gY29udGFpblxuICAgICAgICAgICAgICAnJHtKU09OLnN0cmluZ2lmeShtYXApfSdcbiAgICAgICAgICAgIGA7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrIGVsZW1lbnQncyBpbmxpbmUgc3R5bGVzIG9ubHlcbiAgICovXG4gIHRvSGF2ZVN0eWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbXBhcmU6IGJ1aWxkQ29tcGFyZVN0eWxlRnVuY3Rpb24odHJ1ZSlcbiAgICB9O1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIENoZWNrIGVsZW1lbnQncyBjc3Mgc3R5bGVzaGVldCBvbmx5IChpZiBub3QgcHJlc2VudCBpbmxpbmUpXG4gICAqL1xuICB0b0hhdmVDU1M6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29tcGFyZTogYnVpbGRDb21wYXJlU3R5bGVGdW5jdGlvbihmYWxzZSlcbiAgICB9O1xuICB9XG5cbn07XG5cbi8qKlxuICogQ3VycmllZCB2YWx1ZSB0byBmdW5jdGlvbiB0byBjaGVjayBzdHlsZXMgdGhhdCBhcmUgaW5saW5lIG9yIGluIGEgc3R5bGVzaGVldCBmb3IgdGhlXG4gKiBzcGVjaWZpZWQgRE9NIGVsZW1lbnQuXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkQ29tcGFyZVN0eWxlRnVuY3Rpb24oaW5saW5lT25seSA9IHRydWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhY3R1YWw6IGFueSwgc3R5bGVzOiB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfSB8IHN0cmluZywgc3R5bGVyOiBTdHlsZVV0aWxzKSB7XG4gICAgY29uc3QgZm91bmQgPSB7fTtcbiAgICBjb25zdCBzdHlsZU1hcDoge1trOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG5cbiAgICBpZiAodHlwZW9mIHN0eWxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHN0eWxlTWFwW3N0eWxlc10gPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgT2JqZWN0LmFzc2lnbihzdHlsZU1hcCwgc3R5bGVzKTtcbiAgICB9XG5cbiAgICBsZXQgYWxsUGFzc2VkID0gT2JqZWN0LmtleXMoc3R5bGVNYXApLmxlbmd0aCAhPT0gMDtcbiAgICBPYmplY3Qua2V5cyhzdHlsZU1hcCkuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgIGxldCB7ZWxIYXNTdHlsZSwgY3VycmVudH0gPSBoYXNQcmVmaXhlZFN0eWxlcyhhY3R1YWwsIHByb3AsIHN0eWxlTWFwW3Byb3BdLCBpbmxpbmVPbmx5LFxuICAgICAgICBzdHlsZXIpO1xuICAgICAgYWxsUGFzc2VkID0gYWxsUGFzc2VkICYmIGVsSGFzU3R5bGU7XG4gICAgICBpZiAoIWVsSGFzU3R5bGUpIHtcbiAgICAgICAgZXh0ZW5kT2JqZWN0KGZvdW5kLCBjdXJyZW50KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBwYXNzOiBhbGxQYXNzZWQsXG4gICAgICBnZXQgbWVzc2FnZSgpIHtcbiAgICAgICAgY29uc3QgZXhwZWN0ZWRWYWx1ZVN0ciA9ICh0eXBlb2Ygc3R5bGVzID09PSAnc3RyaW5nJykgPyBzdHlsZU1hcCA6XG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeShzdHlsZU1hcCwgbnVsbCwgMik7XG4gICAgICAgIGNvbnN0IGZvdW5kVmFsdWVTdHIgPSBpbmxpbmVPbmx5ID8gYWN0dWFsLm91dGVySFRNTCA6IEpTT04uc3RyaW5naWZ5KGZvdW5kKTtcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICBFeHBlY3RlZCAke2ZvdW5kVmFsdWVTdHJ9JHshYWxsUGFzc2VkID8gJycgOiAnIG5vdCd9IHRvIGNvbnRhaW4gdGhlXG4gICAgICAgICAgQ1NTICR7dHlwZW9mIHN0eWxlcyA9PT0gJ3N0cmluZycgPyAncHJvcGVydHknIDogJ3N0eWxlcyd9ICcke2V4cGVjdGVkVmFsdWVTdHJ9J1xuICAgICAgICBgO1xuICAgICAgfVxuICAgIH07XG4gIH07XG59XG5cbi8qKlxuICogVmFsaWRhdGUgcHJlc2VuY2Ugb2YgcmVxdWVzdGVkIHN0eWxlIG9yIHVzZSBmYWxsYmFja1xuICogdG8gcG9zc2libGUgYHByZWZpeGVkYCBzdHlsZXMuIFVzZWZ1bCB3aGVuIHNvbWUgYnJvd3NlcnNcbiAqIChTYWZhcmksIElFLCBldGMpIHdpbGwgdXNlIHByZWZpeGVkIHN0eWxlIGluc3RlYWQgb2YgZGVmYXVsdHMuXG4gKi9cbmZ1bmN0aW9uIGhhc1ByZWZpeGVkU3R5bGVzKGFjdHVhbDogSFRNTEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpbmxpbmVPbmx5OiBib29sZWFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVyOiBTdHlsZVV0aWxzKSB7XG4gIGNvbnN0IGN1cnJlbnQgPSB7fTtcblxuICBpZiAodmFsdWUgPT09ICcqJykge1xuICAgIHJldHVybiB7ZWxIYXNTdHlsZTogc3R5bGVyLmxvb2t1cFN0eWxlKGFjdHVhbCwga2V5LCBpbmxpbmVPbmx5KSAhPT0gJycsIGN1cnJlbnR9O1xuICB9XG5cbiAgdmFsdWUgPSB2YWx1ZS50cmltKCk7XG4gIGxldCBlbEhhc1N0eWxlID0gc3R5bGVyLmxvb2t1cFN0eWxlKGFjdHVhbCwga2V5LCBpbmxpbmVPbmx5KSA9PT0gdmFsdWU7XG4gIGlmICghZWxIYXNTdHlsZSkge1xuICAgIGxldCBwcmVmaXhlZFN0eWxlcyA9IGFwcGx5Q3NzUHJlZml4ZXMoe1trZXldOiB2YWx1ZX0pO1xuICAgIE9iamVjdC5rZXlzKHByZWZpeGVkU3R5bGVzKS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgLy8gU2VhcmNoIGZvciBvcHRpb25hbCBwcmVmaXhlZCB2YWx1ZXNcbiAgICAgIGVsSGFzU3R5bGUgPSBlbEhhc1N0eWxlIHx8XG4gICAgICAgIHN0eWxlci5sb29rdXBTdHlsZShhY3R1YWwsIHByb3AsIGlubGluZU9ubHkpID09PSBwcmVmaXhlZFN0eWxlc1twcm9wXTtcbiAgICB9KTtcbiAgfVxuICAvLyBSZXR1cm4gQk9USCBjb25maXJtYXRpb24gYW5kIGN1cnJlbnQgY29tcHV0ZWQga2V5IHZhbHVlcyAoaWYgY29uZmlybWF0aW9uID09IGZhbHNlKVxuICByZXR1cm4ge2VsSGFzU3R5bGUsIGN1cnJlbnR9O1xufVxuXG5mdW5jdGlvbiBlbGVtZW50VGV4dChuOiBhbnkpOiBzdHJpbmcge1xuICBjb25zdCBoYXNOb2RlcyA9IChtOiBhbnkpID0+IHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IF8uY2hpbGROb2RlcyhtKTtcbiAgICByZXR1cm4gY2hpbGRyZW4gJiYgY2hpbGRyZW5bJ2xlbmd0aCddO1xuICB9O1xuXG4gIGlmIChuIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICByZXR1cm4gbi5tYXAoZWxlbWVudFRleHQpLmpvaW4oJycpO1xuICB9XG5cbiAgaWYgKF8uaXNDb21tZW50Tm9kZShuKSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGlmIChfLmlzRWxlbWVudE5vZGUobikgJiYgXy50YWdOYW1lKG4pID09ICdDT05URU5UJykge1xuICAgIHJldHVybiBlbGVtZW50VGV4dChBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoXy5nZXREaXN0cmlidXRlZE5vZGVzKG4pKSk7XG4gIH1cblxuICBpZiAoXy5oYXNTaGFkb3dSb290KG4pKSB7XG4gICAgcmV0dXJuIGVsZW1lbnRUZXh0KF8uY2hpbGROb2Rlc0FzTGlzdChfLmdldFNoYWRvd1Jvb3QobikpKTtcbiAgfVxuXG4gIGlmIChoYXNOb2RlcyhuKSkge1xuICAgIHJldHVybiBlbGVtZW50VGV4dChfLmNoaWxkTm9kZXNBc0xpc3QobikpO1xuICB9XG5cbiAgcmV0dXJuIF8uZ2V0VGV4dChuKTtcbn1cblxuIl19