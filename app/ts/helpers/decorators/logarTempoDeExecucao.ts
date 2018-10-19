export function logarTempoDeExecucao(emSegundos?: boolean){
    
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const metodoOriginal = descriptor.value;

        descriptor.value = function (...args: any[]) {

            let divisor = 1;
            let unidade = 'milisegundos'

            if(emSegundos) {
                divisor = 1000;
                unidade = 'segundos';
            }

            console.log('---------------------------------------------');
            console.log(`[${propertyKey.toUpperCase()}][ENTRADA]: ${JSON.stringify(args)}`);
            const inicio = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            console.log(`[${propertyKey.toUpperCase()}][SAIDA]: ${JSON.stringify(retorno)}`);
            const fim = performance.now();
            console.log(`[${propertyKey.toUpperCase()}][EXECUTOU]:  ${(fim - inicio)/divisor} ${unidade}`);
            console.log('---------------------------------------------');
            return retorno;

        }

        return descriptor;
        
    }
    
}