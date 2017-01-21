import xs from 'xstream';
import { run } from '@cycle/xstream-run';
import { makeDOMDriver, div, input, span } from '@cycle/dom';
import R from 'ramda';

function main(sources) {
  const domSource = sources.DOM;
  const props$ = sources.props;

  const newValue$ = domSource
    .select('.slider')
    .events('input')
    .map(ev => ev.target.value);

  const state$ = props$
    .map(props => newValue$
      .map(val => ({
        label: props.label,
        unit: props.unit,
        min: props.min,
        value: val,
        max: props.max
      }))
      .startWith(props)
    )
    .flatten()
    .remember();

  const vdom$ = state$
    .map(state =>
      div('.labeled-slider', [
        span('.label',
          state.label + ' ' + state.value + state.unit
        ),
        input('.slider', {
          attrs: {
            type: 'range',
            min: state.min,
            max: state.max,
            value: state.value
          }
        })
      ])
    )

  const sinks = {
    DOM: vdom$,
    value: state$.map(state => state.value),
  };
  /**
  var coinbase = web3.eth.coinbase;
  web3.eth.getBalance(coinbase, function (error, balance) {
    console.log(balance.toNumber());
  });
  **/
  return sinks;
}

export const startApp = function startApp() {
  run(main, {
    DOM: makeDOMDriver('#app'),
    props: () => xs.of({
      label: 'Weight',
      unit: 'kg',
      value: 70,
      min: 40,
      max: 120,
    })
  });
}
