
// __mocks__/lucide-react.js
const React = require('react');

// Create a mock for any icon that might be used
const createIconMock = (displayName) => {
  const IconMock = React.forwardRef((props, ref) =>
    React.createElement('svg', {
      ...props,
      ref,
      'data-testid': `${displayName}-icon`,
    })
  );
  IconMock.displayName = displayName;
  return IconMock;
};

// Define a Proxy to dynamically create a mock for any requested icon
const iconMockProxy = new Proxy({}, {
  get: function(target, prop) {
    if (prop === '__esModule') {
      return true;
    }
    // Return a mock component for any icon name
    return createIconMock(prop);
  }
});

module.exports = iconMockProxy;
