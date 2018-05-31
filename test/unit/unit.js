const { expect } = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const { describe, it, after } = lab;

/*const test = require("../../handler/index");

describe('Primera prueba', ()=>{
    it('Suma', (done)=>{
        const n1 = 1;
        const n2 = 2;
        const result = test.testShit(n1, n2+3);
        expect(result).to.be.equal(n1+n2);
        done();
    });

    after((done)=>{
        done();
    });
});*/

const server = require("../../app");
const boyd   = {
    parm1: "adios"
}
describe('Primera prueba servidor', ()=>{
    it('Servidor Post', (done)=>{
        server.inject({
            method: 'POST',
            url:'/',
            headers:{
                'Content-Type':'application/json'
            },
            payload: boyd,
        }, (res)=>{
            console.log(res.result);
            expect(res.result.parametro).to.be.equal(boyd);
            done();            
        });
    });

    after((done)=>{
        done();
    });
});


describe('Prueba redis', ()=>{
    it('Servidor get', (done)=>{
        server.inject({
            method: 'GET',
            url:'/',
            headers:{
                'Content-Type':'application/json'
            },
            payload: boyd,
        }, (res)=>{
            console.log(res.result);
            expect(res.result).to.be.equal("1");
            done();            
        });
    });

    after((done)=>{
        done();
    });
});