import {Mutex} from 'async-mutex';

type getStateType = (key: string) => any;
type setStateType = (value: any) => void;
type stateStateType = () => any;

type stateReturn = {
  get: getStateType;
  set: setStateType;
  state: stateStateType;
}

const redux = (init: any): stateReturn => {
  let internal_state = init;

  const getter = (key: string): any => {
    return internal_state[key]
  }

  const setter = (value: any): void => {
    internal_state = {...value, ...internal_state}
  }

  return {
    get: (key: string): any => {
      return getter(key)
    },
    set: (value: any): void => {
      setter(value)
    },
    state: (): any => {
      return internal_state
    }
  }
}

const state = redux({a: 1})
console.log(state.get('a'))

state.set({b: 2})
console.log(state.state())

var stateSingleton = () => {
  var instance: any

  return {
      getInstance: function () {
          if (!instance) {
              instance = redux({});
          }
          return instance;
      }
  };
}


const stateCommon = stateSingleton()
const gState = stateCommon.getInstance()
gState.set({c: 2})
console.log(gState.state())

const xState = stateCommon.getInstance()
console.log(xState.state())
