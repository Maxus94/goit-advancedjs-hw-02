import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{i as r}from"./assets/vendor-651d7991.js";const m=document.querySelector(".form"),n=document.querySelector('input[name="delay"]'),u=document.querySelector('input[name="step"]'),l=document.querySelector('input[name="amount"]');m.addEventListener("submit",a);function a(s){s.preventDefault(),r.destroy();for(let e=1;e<=Number(l.value);e++)c(e,Number(n.value)+Number(u.value)*(e-1)).then(({position:o,delay:t})=>{r.show({message:`✅ Fulfilled promise ${o} in ${t}ms`,close:!1,backgroundColor:"green",messageColor:"white",messageSize:20,timeout:0,position:"topRight"})}).catch(({position:o,delay:t})=>{r.show({message:`❌ Rejected promise ${o} in ${t}ms`,close:!1,backgroundColor:"red",messageColor:"white",messageSize:20,timeout:0,position:"topRight"})})}function c(s,e){return new Promise((o,t)=>{const i=Math.random()>.3;setTimeout(()=>{i?o({position:s,delay:e}):t({position:s,delay:e})},e)})}
//# sourceMappingURL=commonHelpers3.js.map