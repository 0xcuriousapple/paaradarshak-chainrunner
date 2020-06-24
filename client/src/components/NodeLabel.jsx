import React from 'react';

class NodeLabel extends React.PureComponent {
    render() {
        const { className, nodeData } = this.props
        return (
            <div className={className}>
                <h2>{nodeData.name}</h2>
                {nodeData._children &&
                    <button>{nodeData._collapsed ? 'Expand' : 'Collapse'}</button>
                }
            </div>
        )
    }
}

export default NodeLabel;