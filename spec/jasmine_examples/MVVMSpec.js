import {Compiler} from "../../mvvm_lib/compiler";
import {HeroComponent} from "../../src/home/hero";
import {HeroComponent2} from "../../src/home/hero2";

describe("MVVM", () => {
    let compiler;
    let view1 = '#hero';
    let view2 = '#her2'
    let modal1;
    let modal2;

    beforeEach(() => {
        compiler = new Compiler();
        modal1 = new HeroComponent();
        modal2 = new HeroComponent2();
    })


    describe('will connect view1 with modal1 after compiled', () => {
        beforeEach(() => {
            compiler.compile(view1, modal1);
        })
        it('It"s modal bind data to view?', () => {
            const span = document.querySelector('#hero').querySelector('[c-text="hero_name"]');
            expect(span.innerText).toEqual(modal1.hero_name);
            modal1.hero_name = 'sunwukong';
            expect(span.innerText).toEqual('sunwukong');
        })

        it('two way binding date', () => {
            const input = document.querySelector('#hero').querySelector('[c-value="hero_name"]');
            expect(input.value).toEqual(modal1.hero_name);
            // spyOn(input,'input').and.returnValue('qitiandasheng');
            input.value = 'qitiandasheng';
            input.dispatchEvent(new Event('input'));
            expect(modal1.hero_name).toEqual('qitiandasheng');
        })
    })

})