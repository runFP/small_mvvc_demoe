import './src/home/hero'
import {Compiler} from '/demo/small_mvvc_demoe/mvvm_lib/compiler'
import {HeroComponent} from './src/home/hero'
import {HeroComponent2} from "./src/home/hero2";

// compile the template and connect view and modal use viewModal
const compiler = new Compiler();
compiler.compile('#hero', new HeroComponent());
compiler.compile('#hero2', new HeroComponent2());
