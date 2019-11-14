Bridge.assembly("ENN Snake Game", function ($asm, globals) {
    "use strict";


    var $m = Bridge.setMetadata,
        $n = ["System","System.Collections.Generic","ENN_Snake_Game","System.Threading"];
    $m("ENN_Snake_Game.StartGame", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"FitnessFunction","t":8,"pi":[{"n":"index","pt":$n[0].Int32,"ps":0}],"sn":"FitnessFunction","rt":$n[0].Single,"p":[$n[0].Int32],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"Main","is":true,"t":8,"sn":"Main","rt":$n[0].Void},{"a":2,"n":"Start","t":8,"sn":"Start","rt":$n[0].Void},{"a":1,"n":"Update","t":8,"sn":"Update","rt":$n[0].Void},{"a":1,"n":"UpdateText","t":8,"pi":[{"n":"bestGenes","pt":$n[0].Array.type(System.Array.type(System.Array.type(System.Single))),"ps":0},{"n":"bestFitness","pt":$n[0].Single,"ps":1},{"n":"generation","pt":$n[0].Int32,"ps":2}],"sn":"UpdateText","rt":$n[0].Void,"p":[$n[0].Array.type(System.Array.type(System.Array.type(System.Single))),$n[0].Single,$n[0].Int32]},{"a":2,"n":"SnakeList","t":4,"rt":$n[1].List$1(ENN_Snake_Game.Snake),"sn":"SnakeList"},{"a":1,"n":"Tu","is":true,"t":4,"rt":$n[2].StartGame,"sn":"Tu"},{"a":1,"n":"deathCount","t":4,"rt":$n[0].Int32,"sn":"deathCount","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"elitism","t":4,"rt":$n[0].Int32,"sn":"elitism","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"filePath","t":4,"rt":$n[0].String,"sn":"filePath"},{"a":1,"n":"ga","t":4,"rt":$n[2].GA,"sn":"ga"},{"a":1,"n":"mutationRate","t":4,"rt":$n[0].Single,"sn":"mutationRate","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"nn","t":4,"rt":$n[2].NeuralNetwork,"sn":"nn"},{"a":1,"n":"populationSize","t":4,"rt":$n[0].Int32,"sn":"populationSize","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"random","t":4,"rt":$n[0].Random,"sn":"random"},{"a":1,"n":"timer","t":4,"rt":$n[3].Timer,"sn":"timer"}]}; }, $n);
    $m("ENN_Snake_Game.FileReadWrite", function () { return {"att":1048961,"a":2,"s":true,"m":[{"a":2,"n":"ReadFromJsonFile","is":true,"t":8,"pi":[{"n":"filePath","pt":$n[0].String,"ps":0}],"tpc":1,"tprm":["T"],"sn":"ReadFromJsonFile","rt":System.Object,"p":[$n[0].String]},{"a":2,"n":"WriteToJsonFile","is":true,"t":8,"pi":[{"n":"filePath","pt":$n[0].String,"ps":0},{"n":"objectToWrite","pt":System.Object,"ps":1},{"n":"append","dv":false,"o":true,"pt":$n[0].Boolean,"ps":2}],"tpc":1,"tprm":["T"],"sn":"WriteToJsonFile","rt":$n[0].Void,"p":[$n[0].String,System.Object,$n[0].Boolean]}]}; }, $n);
    $m("ENN_Snake_Game.GA", function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[0].Int32,$n[0].Random,$n[0].Int32,$n[0].Single,Function,$n[0].Int32,$n[0].Int32,$n[0].String],"pi":[{"n":"populationSize","pt":$n[0].Int32,"ps":0},{"n":"random","pt":$n[0].Random,"ps":1},{"n":"elitism","pt":$n[0].Int32,"ps":2},{"n":"mutationRate","pt":$n[0].Single,"ps":3},{"n":"fitnessFunction","pt":Function,"ps":4},{"n":"loadExternalGenes","pt":$n[0].Int32,"ps":5},{"n":"saveGenes","pt":$n[0].Int32,"ps":6},{"n":"filePath","pt":$n[0].String,"ps":7}],"sn":"ctor"},{"a":2,"n":"CalculatePopulationFitness","t":8,"sn":"CalculatePopulationFitness","rt":$n[0].Void},{"a":1,"n":"ChooseParent","t":8,"sn":"ChooseParent","rt":$n[2].NeuralNetwork},{"a":2,"n":"CompareDNA","t":8,"pi":[{"n":"a","pt":$n[2].NeuralNetwork,"ps":0},{"n":"b","pt":$n[2].NeuralNetwork,"ps":1}],"sn":"CompareDNA","rt":$n[0].Int32,"p":[$n[2].NeuralNetwork,$n[2].NeuralNetwork],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"LoadData","t":8,"pi":[{"n":"filePath","pt":$n[0].String,"ps":0}],"sn":"LoadData","rt":$n[0].Void,"p":[$n[0].String]},{"a":2,"n":"NewGeneration","t":8,"sn":"NewGeneration","rt":$n[0].Void},{"a":2,"n":"SaveData","t":8,"pi":[{"n":"filePath","pt":$n[0].String,"ps":0}],"sn":"SaveData","rt":$n[0].Void,"p":[$n[0].String]},{"a":2,"n":"BestFitness","t":16,"rt":$n[0].Single,"g":{"a":2,"n":"get_BestFitness","t":8,"rt":$n[0].Single,"fg":"BestFitness","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"s":{"a":1,"n":"set_BestFitness","t":8,"p":[$n[0].Single],"rt":$n[0].Void,"fs":"BestFitness"},"fn":"BestFitness"},{"a":2,"n":"BestGenes","t":16,"rt":$n[0].Array.type(System.Array.type(System.Array.type(System.Single))),"g":{"a":2,"n":"get_BestGenes","t":8,"rt":$n[0].Array.type(System.Array.type(System.Array.type(System.Single))),"fg":"BestGenes"},"s":{"a":1,"n":"set_BestGenes","t":8,"p":[$n[0].Array.type(System.Array.type(System.Array.type(System.Single)))],"rt":$n[0].Void,"fs":"BestGenes"},"fn":"BestGenes"},{"a":2,"n":"Generation","t":16,"rt":$n[0].Int32,"g":{"a":2,"n":"get_Generation","t":8,"rt":$n[0].Int32,"fg":"Generation","box":function ($v) { return Bridge.box($v, System.Int32);}},"s":{"a":1,"n":"set_Generation","t":8,"p":[$n[0].Int32],"rt":$n[0].Void,"fs":"Generation"},"fn":"Generation"},{"a":2,"n":"Population","t":16,"rt":$n[1].List$1(ENN_Snake_Game.NeuralNetwork),"g":{"a":2,"n":"get_Population","t":8,"rt":$n[1].List$1(ENN_Snake_Game.NeuralNetwork),"fg":"Population"},"s":{"a":1,"n":"set_Population","t":8,"p":[$n[1].List$1(ENN_Snake_Game.NeuralNetwork)],"rt":$n[0].Void,"fs":"Population"},"fn":"Population"},{"a":2,"n":"bestNetwork","t":4,"rt":$n[2].NeuralNetwork,"sn":"bestNetwork"},{"a":2,"n":"elitism","t":4,"rt":$n[0].Int32,"sn":"elitism","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"filePath","t":4,"rt":$n[0].String,"sn":"filePath"},{"a":1,"n":"fitnessSum","t":4,"rt":$n[0].Single,"sn":"fitnessSum","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"loadExternalGenes","t":4,"rt":$n[0].Int32,"sn":"loadExternalGenes","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"mutationRate","t":4,"rt":$n[0].Single,"sn":"mutationRate","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"newPopulation","t":4,"rt":$n[1].List$1(ENN_Snake_Game.NeuralNetwork),"sn":"newPopulation"},{"a":1,"n":"nnLayer","t":4,"rt":$n[0].Array.type(System.Int32),"sn":"nnLayer"},{"a":1,"n":"populationSize","t":4,"rt":$n[0].Int32,"sn":"populationSize","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"random","t":4,"rt":$n[0].Random,"sn":"random"},{"a":1,"n":"saveGenes","t":4,"rt":$n[0].Int32,"sn":"saveGenes","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"backing":true,"n":"<BestFitness>k__BackingField","t":4,"rt":$n[0].Single,"sn":"BestFitness","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"backing":true,"n":"<BestGenes>k__BackingField","t":4,"rt":$n[0].Array.type(System.Array.type(System.Array.type(System.Single))),"sn":"BestGenes"},{"a":1,"backing":true,"n":"<Generation>k__BackingField","t":4,"rt":$n[0].Int32,"sn":"Generation","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"backing":true,"n":"<Population>k__BackingField","t":4,"rt":$n[1].List$1(ENN_Snake_Game.NeuralNetwork),"sn":"Population"}]}; }, $n);
    $m("ENN_Snake_Game.NeuralNetwork", function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[0].Array.type(System.Int32),$n[0].Random,Function],"pi":[{"n":"layers","pt":$n[0].Array.type(System.Int32),"ps":0},{"n":"random","pt":$n[0].Random,"ps":1},{"n":"fitnessFunction","pt":Function,"ps":2}],"sn":"ctor"},{"a":2,"n":"CalculateFitness","t":8,"pi":[{"n":"index","pt":$n[0].Int32,"ps":0}],"sn":"CalculateFitness","rt":$n[0].Single,"p":[$n[0].Int32],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"CreateNeurons","t":8,"sn":"CreateNeurons","rt":$n[0].Void},{"a":1,"n":"CreateWeights","t":8,"sn":"CreateWeights","rt":$n[0].Void},{"a":2,"n":"Crossover","t":8,"pi":[{"n":"otherParents","pt":$n[2].NeuralNetwork,"ps":0}],"sn":"Crossover","rt":$n[2].NeuralNetwork,"p":[$n[2].NeuralNetwork]},{"a":2,"n":"FeedFoward","t":8,"pi":[{"n":"input","pt":$n[0].Array.type(System.Single),"ps":0}],"sn":"FeedFoward","rt":$n[0].Array.type(System.Single),"p":[$n[0].Array.type(System.Single)]},{"a":2,"n":"Mutate","t":8,"pi":[{"n":"mutationRate","pt":$n[0].Single,"ps":0}],"sn":"Mutate","rt":$n[0].Void,"p":[$n[0].Single]},{"a":2,"n":"Fitness","t":16,"rt":$n[0].Single,"g":{"a":2,"n":"get_Fitness","t":8,"rt":$n[0].Single,"fg":"Fitness","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},"s":{"a":1,"n":"set_Fitness","t":8,"p":[$n[0].Single],"rt":$n[0].Void,"fs":"Fitness"},"fn":"Fitness"},{"a":1,"n":"FitnessFunction","t":4,"rt":Function,"sn":"FitnessFunction"},{"a":1,"n":"Layers","t":4,"rt":$n[0].Array.type(System.Int32),"sn":"Layers"},{"a":1,"n":"neurons","t":4,"rt":$n[0].Array.type(System.Array.type(System.Single)),"sn":"neurons"},{"a":1,"n":"random","t":4,"rt":$n[0].Random,"sn":"random"},{"a":2,"n":"weights","t":4,"rt":$n[0].Array.type(System.Array.type(System.Array.type(System.Single))),"sn":"weights"},{"a":1,"backing":true,"n":"<Fitness>k__BackingField","t":4,"rt":$n[0].Single,"sn":"Fitness","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    $m("ENN_Snake_Game.SaveData", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"SavedMember","t":4,"rt":$n[1].List$1(ENN_Snake_Game.NeuralNetwork),"sn":"SavedMember"}]}; }, $n);
    $m("ENN_Snake_Game.Snake", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Decision","t":8,"pi":[{"n":"member","pt":$n[2].NeuralNetwork,"ps":0}],"sn":"Decision","rt":$n[0].Void,"p":[$n[2].NeuralNetwork]},{"a":2,"n":"Game","t":8,"pi":[{"n":"a","pt":$n[0].Int32,"ps":0}],"sn":"Game","rt":$n[0].Void,"p":[$n[0].Int32]},{"a":2,"n":"GetInput","t":8,"sn":"GetInput","rt":$n[0].Array.type(System.Single)},{"a":2,"n":"LoopGame","t":8,"pi":[{"n":"a","pt":$n[0].Int32,"ps":0},{"n":"member","pt":$n[2].NeuralNetwork,"ps":1},{"n":"ms","pt":$n[0].Single,"ps":2}],"sn":"LoopGame","rt":$n[0].Void,"p":[$n[0].Int32,$n[2].NeuralNetwork,$n[0].Single]},{"a":2,"n":"Reset","t":8,"pi":[{"n":"a","pt":$n[0].Int32,"ps":0}],"sn":"Reset","rt":$n[0].Void,"p":[$n[0].Int32]},{"a":2,"n":"StartGame","t":8,"pi":[{"n":"a","pt":$n[0].Int32,"ps":0}],"sn":"StartGame","rt":$n[0].Void,"p":[$n[0].Int32]},{"a":1,"n":"aliveTime","t":4,"rt":$n[0].Single,"sn":"aliveTime","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"ax","t":4,"rt":$n[0].Single,"sn":"ax","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"ay","t":4,"rt":$n[0].Single,"sn":"ay","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"bodyDown","t":4,"rt":$n[0].Single,"sn":"bodyDown","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"bodyLeft","t":4,"rt":$n[0].Single,"sn":"bodyLeft","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"bodyRight","t":4,"rt":$n[0].Single,"sn":"bodyRight","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"bodyUp","t":4,"rt":$n[0].Single,"sn":"bodyUp","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"die","t":4,"rt":$n[0].Int32,"sn":"die","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"distance","t":4,"rt":$n[0].Single,"sn":"distance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"foodDown","t":4,"rt":$n[0].Single,"sn":"foodDown","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"foodLeft","t":4,"rt":$n[0].Single,"sn":"foodLeft","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"foodRight","t":4,"rt":$n[0].Single,"sn":"foodRight","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"foodUp","t":4,"rt":$n[0].Single,"sn":"foodUp","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"gs","t":4,"rt":$n[0].Single,"sn":"gs","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"inputList","t":4,"rt":$n[1].List$1(System.Single),"sn":"inputList"},{"a":1,"n":"newDistance","t":4,"rt":$n[0].Single,"sn":"newDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"oldDistance","t":4,"rt":$n[0].Single,"sn":"oldDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"px","t":4,"rt":$n[0].Single,"sn":"px","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"py","t":4,"rt":$n[0].Single,"sn":"py","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"score","t":4,"rt":$n[0].Single,"sn":"score","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"tail","t":4,"rt":$n[0].Single,"sn":"tail","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"tc","t":4,"rt":$n[0].Single,"sn":"tc","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"timer","t":4,"rt":$n[3].Timer,"sn":"timer"},{"a":1,"n":"trail","t":4,"rt":$n[0].Array.type(System.Single),"sn":"trail"},{"a":2,"n":"vx","t":4,"rt":$n[0].Single,"sn":"vx","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"vy","t":4,"rt":$n[0].Single,"sn":"vy","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"wallDown","t":4,"rt":$n[0].Single,"sn":"wallDown","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"wallLeft","t":4,"rt":$n[0].Single,"sn":"wallLeft","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"wallRight","t":4,"rt":$n[0].Single,"sn":"wallRight","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"wallUp","t":4,"rt":$n[0].Single,"sn":"wallUp","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
});