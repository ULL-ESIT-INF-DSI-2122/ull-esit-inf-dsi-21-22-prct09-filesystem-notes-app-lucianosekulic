
/**
 * clase abstracta a modo de template
 */
export abstract class metodoTemplate {
    protected arrayInicial: number[] = []
    protected num: number = 0
    constructor() {}


    public run() {
        this.operationFilter(this.arrayInicial, this.num);
        this.operationMap(this.arrayInicial);
        this.operationReduce();
    }

    /**
     * operacion filtro incial donde se le pasa un array y un numero
     * en modo de filtro para se quede con los mayores que ese numero
     * @param arrayInicial 
     * @param numFiltro 
     * @returns arrayAux
     */
    protected operationFilter(arrayInicial: number[], numFiltro: number) {
        let arrayAux: number[] = []
        for(let i = 0; i < arrayInicial.length; i++) {
            if(arrayInicial[i] > numFiltro) {
                arrayAux.push(arrayInicial[i])
            }
        }
        return arrayAux
    }

    /**
     * funcion donde se le pasa un array y hace una operacion map inicial
     * donde se eleva al cuadrado todas las posiciones del arrayInicial
     * @param arrayInicial 
     * @returns arrayAuxMap
     */
    protected operationMap(arrayInicial: number[]) {
        let arrayAuxMap: number[] = []
        for(let i = 0; i < arrayInicial.length; i++) {
            arrayAuxMap.push(Math.pow(arrayInicial[i], 2))
        }
        return arrayAuxMap
    }

    protected operationReduce(){

    }

}


/**
 * clase de algoritmos genericos de filter, map y reduce
 */
export class algoritmosGenericos extends metodoTemplate{
    constructor(protected arrayGenerico: number[], protected numFiltro: number){
        super();
    }

    protected filter(operationFilter: (numFiltro: number) => number) {
        return operationFilter
    }
    protected Map(operationMap: (arrayGenerico: number[]) => number) {
        return operationMap
    }

    /**
     * en reduce se realiza la suma de los numeros dentro del array
     * @param arrayAuxMap 
     * @returns aux
     */
    protected reduce(arrayAuxMap: number[]) {
        let aux: number = 0;
        for(let i = 0; i < arrayAuxMap.length; i++) {
            aux = aux + arrayAuxMap[i];
        }
        return aux
    }



}