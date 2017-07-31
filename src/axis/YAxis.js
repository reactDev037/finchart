import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Faux from 'react-faux-dom';
import styled from 'styled-components';
import { axisLeft } from 'd3-axis';
import { select } from 'd3-selection';
import { format } from 'd3-format';

export class Component extends PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    yScale: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    tickAmount: PropTypes.number,
    tickArguments: PropTypes.arrayOf(PropTypes.any),
    tickFormat: PropTypes.func,
    tickSize: PropTypes.number,
    tickSizeInner: PropTypes.number,
    tickSizeOuter: PropTypes.number,
    tickOffset: PropTypes.number,
    axisName: PropTypes.string,
    axisNameOffset: PropTypes.number,
    transform: PropTypes.string,
    notick: PropTypes.bool,
    // showGrid: PropTypes.bool,
  };

  static defaultProps = {
    tickAmount: 5,
    tickArguments: null,
    tickFormat: format('.0s'),
    tickSize: 4,
    tickSizeInner: 0,
    tickSizeOuter: 0,
    tickOffset: 5,
    axisNameOffset: 25,
    transform: null,
    notick: false,
    // showGrid: false, // TODO: support dashed grids
  };

  render() {
    const {
      className,
      height,
      yScale,
      tickAmount,
      tickArguments,
      tickFormat,
      tickSize,
      tickSizeInner,
      tickSizeOuter,
      tickOffset,
      axisName,
      axisNameOffset,
      transform,
      notick,
    } = this.props;

    const axis = axisLeft(yScale)
      .tickArguments(tickArguments)
      .ticks(tickArguments ? null : tickAmount)
      .tickFormat(notick ? '' : tickFormat)
      .tickSize(tickSize)
      .tickSizeInner(tickSize ? null : tickSizeInner)
      .tickSizeOuter(tickSize ? null : tickSizeOuter)
      .tickPadding(tickOffset);

    const axisGroup = Faux.createElement('g');
    axisGroup.setAttribute('class', `yaxis-${className}`);
    axisGroup.setAttribute('transform', transform);

    const label = Faux.createElement('text');
    label.setAttribute('class', 'axisName');
    label.setAttribute('transform', `translate(-${axisNameOffset}, ${height / 2}) rotate(270)`);
    label.innerHTML = axisName;
    axisGroup.appendChild(label);

    const axisDom = select(axisGroup).call(axis);
    return axisDom.node().toReact();
  }
}

export default styled(Component)`
  shape-rendering: crispEdges;
  fill: darkgrey;
  fill-opacity: 1;
  stroke: darkgrey;
  stroke-opacity: 0.3;

  .axisName {
    fill: black;
    font-weight: bold;
    text-anchor: middle;
  }

  .domain {
    fill: none;
    stroke: black;
    stroke-opacity: 0.8;
  }
`;
