/// <reference types="cheerio" />
import {CommonWrapper, ShallowWrapper, ReactWrapper} from 'enzyme';

export interface Json {
  type: string;
  props: {[key: string]: any};
  children: Array<Json>;
  $$typeof: Symbol;
}

export interface OutputMapper {
  (json: Json): Json;
}

export interface Options {
  map?: OutputMapper;
  noKey: boolean;
  mode?: 'shallow' | 'deep';
}

/**
 * toJson helper is used to convert any Enzyme wrapper to a format compatible with Jest snapshot
 * @param wrapper any Enzyme wrapper
 * @param [options] an option object which accepts `map`, `noKey` and `mode` as keys
 */
declare function toJson(wrapper: CommonWrapper, options?: Options): Json;

/**
 * shallowToJson helper is used to convert Enzyme shallow wrappers to a format compatible with Jest snapshot
 * @param wrapper an Enzyme shallow wrapper
 * @param [options] an option object which accepts `map`, `noKey` and `mode` as keys
 */
declare function shallowToJson(
  wrapper: ShallowWrapper,
  options?: Options,
): Json;

/**
 * mountToJson helper is used to convert Enzyme mount wrappers to a format compatible with Jest snapshot
 * @param wrapper an Enzyme mount wrapper
 * @param [options] an option object which accepts `map`, `noKey` and `mode` as keys
 */
declare function mountToJson(wrapper: ReactWrapper, options?: Options): Json;

/**
 * renderToJson helper is used to convert Enzyme render wrappers to a format compatible with Jest snapshot
 * @param wrapper an Enzyme render wrapper
 * @param [options] an option object which accepts `map`, `noKey` and `mode` as keys
 */
declare function renderToJson(wrapper: Cheerio, options?: Options): Json;

export default toJson;
