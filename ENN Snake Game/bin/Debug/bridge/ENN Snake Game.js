/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2019
 * @compiler Bridge.NET 17.9.0
 */
Bridge.assembly("ENN Snake Game", function ($asm, globals) {
    "use strict";

    Bridge.define("ENN_Snake_Game.FileReadWrite", {
        statics: {
            methods: {
                /**
                 * Writes the given object instance to a Json file.
                 <p>Object type must have a parameterless constructor.</p><p>Only Public properties and variables will be written to the file. These can be any type though, even other classes.</p><p>If there are public properties/variables that you do not want written to the file, decorate them with the [JsonIgnore] attribute.</p>
                 *
                 * @static
                 * @public
                 * @this ENN_Snake_Game.FileReadWrite
                 * @memberof ENN_Snake_Game.FileReadWrite
                 * @param   {Function}    T                The type of object being written to the file.
                 * @param   {string}      filePath         The file path to write the object instance to.
                 * @param   {T}           objectToWrite    The object instance to write to the file.
                 * @param   {boolean}     append           If false the file will be overwritten if it already exists. If true the contents will be appended to the file.
                 * @return  {void}
                 */
                WriteToJsonFile: function (T, filePath, objectToWrite, append) {
                    if (append === void 0) { append = false; }
                    var writer = null;
                    try {
                        var contentsToWriteToFile = Newtonsoft.Json.JsonConvert.SerializeObject(objectToWrite);
                        writer = new System.IO.StreamWriter.$ctor6(filePath, append);
                        writer.Write$10(contentsToWriteToFile);
                    } finally {
                        if (writer != null) {
                            writer.Close();
                        }
                    }
                },
                /**
                 * Reads an object instance from an Json file.
                 <p>Object type must have a parameterless constructor.</p>
                 *
                 * @static
                 * @public
                 * @this ENN_Snake_Game.FileReadWrite
                 * @memberof ENN_Snake_Game.FileReadWrite
                 * @param   {Function}    T           The type of object to read from the file.
                 * @param   {string}      filePath    The file path to read the object instance from.
                 * @return  {T}                       Returns a new instance of the object read from the Json file.
                 */
                ReadFromJsonFile: function (T, filePath) {
                    var reader = null;
                    try {
                        reader = new System.IO.StreamReader.$ctor7(filePath);
                        var fileContents = reader.ReadToEnd();
                        return Newtonsoft.Json.JsonConvert.DeserializeObject(fileContents, T);
                    } finally {
                        if (reader != null) {
                            reader.Close();
                        }
                    }
                }
            }
        }
    });

    Bridge.define("ENN_Snake_Game.GA", {
        fields: {
            Population: null,
            newPopulation: null,
            Generation: 0,
            BestFitness: 0,
            BestGenes: null,
            elitism: 0,
            mutationRate: 0,
            fitnessSum: 0,
            saveGenes: 0,
            loadExternalGenes: 0,
            populationSize: 0,
            filePath: null,
            nnLayer: null,
            random: null,
            bestNetwork: null
        },
        ctors: {
            init: function () {
                this.nnLayer = System.Array.init([12, 10, 10, 4], System.Int32);
            },
            ctor: function (populationSize, random, elitism, mutationRate, fitnessFunction, loadExternalGenes, saveGenes, filePath) {
                this.$initialize();
                this.random = random;
                this.elitism = elitism;
                this.mutationRate = mutationRate;
                this.saveGenes = saveGenes;
                this.loadExternalGenes = loadExternalGenes;
                this.populationSize = populationSize;
                this.filePath = filePath;
                this.Generation = 1;

                this.Population = new (System.Collections.Generic.List$1(ENN_Snake_Game.NeuralNetwork)).$ctor2(populationSize);
                this.newPopulation = new (System.Collections.Generic.List$1(ENN_Snake_Game.NeuralNetwork)).$ctor2(populationSize);

                for (var i = 0; i < populationSize; i = (i + 1) | 0) {
                    /*if (i < loadExternalGenes) {
                        if (Bridge.referenceEquals(filePath, "")) {
                        }
                        this.LoadData(filePath);
                    }*/
                    this.Population.add(new ENN_Snake_Game.NeuralNetwork(this.nnLayer, random, fitnessFunction));
                }
            }
        },
        methods: {
            NewGeneration: function () {
                if (this.Population.Count <= 0) {
                    return;
                }
                this.CalculatePopulationFitness();
                this.Population.Sort$2(Bridge.fn.cacheBind(this, this.CompareDNA));

                /*if (this.Generation % 500 === 0) {
                    this.SaveData(this.filePath);
                }*/

                this.newPopulation.clear();

                for (var i = 0; i < this.Population.Count; i = (i + 1) | 0) {
                    if (i < this.elitism) {
                        this.newPopulation.add(this.Population.getItem(i));
                    } else {
                        var parent1 = this.ChooseParent();
                        var parent2 = this.ChooseParent();

                        var child = parent1.Crossover(parent2);

                        child.Mutate(this.mutationRate);

                        this.newPopulation.add(child);
                    }

                }

                var temporaryList = this.Population;
                this.Population = this.newPopulation;
                this.newPopulation = temporaryList;

                this.Generation = (this.Generation + 1) | 0;
            },
            CalculatePopulationFitness: function () {
                this.fitnessSum = 0;
                var best = this.Population.getItem(0);

                for (var i = 0; i < this.Population.Count; i = (i + 1) | 0) {
                    this.fitnessSum += this.Population.getItem(i).CalculateFitness(i);

                    if (this.Population.getItem(i).Fitness > best.Fitness) {
                        best = this.Population.getItem(i);
                    }
                }

                this.bestNetwork = best;
                this.BestFitness = best.Fitness;
                this.BestGenes = best.weights;

            },
            CompareDNA: function (a, b) {
                if (a.Fitness > b.Fitness) {
                    return -1;
                } else if (a.Fitness < b.Fitness) {
                    return 1;
                } else {
                    return 0;
                }
            },
            ChooseParent: function () {
                var randomNumber = this.random.NextDouble() * this.fitnessSum;

                for (var i = 0; i < this.Population.Count; i = (i + 1) | 0) {
                    if (randomNumber < this.Population.getItem(i).Fitness) {
                        return this.Population.getItem(i);
                    }

                    randomNumber -= Math.abs(this.Population.getItem(i).Fitness);
                }

                return null;
            },
            SaveData: function (filePath) {
                var $t;
                var save = ($t = new ENN_Snake_Game.SaveData(), $t.SavedMember = new (System.Collections.Generic.List$1(ENN_Snake_Game.NeuralNetwork)).ctor(), $t);

                for (var i = 0; i < this.saveGenes; i = (i + 1) | 0) {
                    save.SavedMember.add(this.Population.getItem(i));
                }

                ENN_Snake_Game.FileReadWrite.WriteToJsonFile(ENN_Snake_Game.SaveData, filePath, save);
            },
            LoadData: function (filePath) {

                var save = ENN_Snake_Game.FileReadWrite.ReadFromJsonFile(ENN_Snake_Game.SaveData, filePath);
                for (var i = 0; i < this.loadExternalGenes; i = (i + 1) | 0) {
                    this.Population.add(save.SavedMember.getItem(i));
                }
            }
        }
    });

    Bridge.define("ENN_Snake_Game.NeuralNetwork", {
        fields: {
            Layers: null,
            neurons: null,
            weights: null,
            random: null,
            Fitness: 0,
            FitnessFunction: null
        },
        ctors: {
            ctor: function (layers, random, fitnessFunction) {
                this.$initialize();
                this.FitnessFunction = fitnessFunction;
                this.Layers = System.Array.init(layers.length, 0, System.Int32);
                for (var i = 0; i < layers.length; i = (i + 1) | 0) {
                    this.Layers[System.Array.index(i, this.Layers)] = layers[System.Array.index(i, layers)];
                }


                this.random = random;

                this.CreateNeurons();
                this.CreateWeights();

            }
        },
        methods: {
            CreateNeurons: function () {
                var neuronList = new (System.Collections.Generic.List$1(System.Array.type(System.Single))).ctor();
                for (var i = 0; i < this.Layers.length; i = (i + 1) | 0) {
                    neuronList.add(System.Array.init(this.Layers[System.Array.index(i, this.Layers)], 0, System.Single));
                }

                this.neurons = neuronList.ToArray();
            },
            CreateWeights: function () {
                var weightList = new (System.Collections.Generic.List$1(System.Array.type(System.Array.type(System.Single)))).ctor();
                for (var i = 1; i < this.Layers.length; i = (i + 1) | 0) {
                    var layerWeightList = new (System.Collections.Generic.List$1(System.Array.type(System.Single))).ctor();
                    var neuronInPreviousLayer = this.Layers[System.Array.index(((i - 1) | 0), this.Layers)];

                    for (var j = 0; j < this.neurons[System.Array.index(i, this.neurons)].length; j = (j + 1) | 0) {
                        var neuronWeights = System.Array.init(neuronInPreviousLayer, 0, System.Single);

                        for (var k = 0; k < neuronInPreviousLayer; k = (k + 1) | 0) {
                            neuronWeights[System.Array.index(k, neuronWeights)] = this.random.NextDouble() * 100 - 50.0;
                        }

                        layerWeightList.add(neuronWeights);
                    }

                    weightList.add(layerWeightList.ToArray());
                }

                this.weights = weightList.ToArray();
            },
            FeedFoward: function (input) {
                var $t, $t1, $t2, $t3, $t4;
                for (var i = 0; i < input.length; i = (i + 1) | 0) {
                    ($t = this.neurons[System.Array.index(0, this.neurons)])[System.Array.index(i, $t)] = input[System.Array.index(i, input)];
                }

                for (var i1 = 1; i1 < this.Layers.length; i1 = (i1 + 1) | 0) {
                    for (var j = 0; j < this.neurons[System.Array.index(i1, this.neurons)].length; j = (j + 1) | 0) {
                        var value = 0.25;
                        for (var k = 0; k < this.neurons[System.Array.index(((i1 - 1) | 0), this.neurons)].length; k = (k + 1) | 0) {
                            value += ($t1 = ($t2 = this.weights[System.Array.index(((i1 - 1) | 0), this.weights)])[System.Array.index(j, $t2)])[System.Array.index(k, $t1)] * ($t3 = this.neurons[System.Array.index(((i1 - 1) | 0), this.neurons)])[System.Array.index(k, $t3)];

                        }

                        ($t4 = this.neurons[System.Array.index(i1, this.neurons)])[System.Array.index(j, $t4)] = 1 / (1 + Math.exp(-value));
                    }
                }

                return this.neurons[System.Array.index(((this.neurons.length - 1) | 0), this.neurons)];
            },
            CalculateFitness: function (index) {
                this.Fitness = this.FitnessFunction(index);
                return this.Fitness;
            },
            Crossover: function (otherParents) {
                var $t, $t1, $t2, $t3, $t4, $t5, $t6;
                var child = new ENN_Snake_Game.NeuralNetwork(this.Layers, this.random, this.FitnessFunction);

                for (var i = 0; i < this.weights.length; i = (i + 1) | 0) {
                    for (var j = 0; j < this.weights[System.Array.index(i, this.weights)].length; j = (j + 1) | 0) {
                        for (var k = 0; k < ($t = this.weights[System.Array.index(i, this.weights)])[System.Array.index(j, $t)].length; k = (k + 1) | 0) {
                            ($t1 = ($t2 = child.weights[System.Array.index(i, child.weights)])[System.Array.index(j, $t2)])[System.Array.index(k, $t1)] = this.random.NextDouble() < 0.5 ? ($t3 = ($t4 = this.weights[System.Array.index(i, this.weights)])[System.Array.index(j, $t4)])[System.Array.index(k, $t3)] : ($t5 = ($t6 = otherParents.weights[System.Array.index(i, otherParents.weights)])[System.Array.index(j, $t6)])[System.Array.index(k, $t5)];
                            /* The above line is equivalent to:
                            if (random.NextDouble() < 0.5)
                            {
                               child.weights[i][j][k] = weights[i][j][k];
                            }
                            else {
                               child.weights[i][j][k] = otherParents.weights[i][j][k];
                            }*/

                        }
                    }
                }
                return child;
            },
            Mutate: function (mutationRate) {
                var $t, $t1, $t2;
                for (var i = 0; i < this.weights.length; i = (i + 1) | 0) {
                    for (var j = 0; j < this.weights[System.Array.index(i, this.weights)].length; j = (j + 1) | 0) {
                        for (var k = 0; k < ($t = this.weights[System.Array.index(i, this.weights)])[System.Array.index(j, $t)].length; k = (k + 1) | 0) {
                            if (this.random.NextDouble() < mutationRate) {
                                /* float weight = weights[i][j][k];

                                //mutate weight value 
                                float randomNumber = (float)random.NextDouble() * 50;

                                if (randomNumber <= 2f)
                                { //if 1
                                 //flip sign of weight
                                   weight *= -1f;
                                }
                                else if (randomNumber <= 4f)
                                { //if 2
                                 //pick random weight between -1 and 1
                                   weight = (float)random.NextDouble() * 2 - 1;
                                }
                                else if (randomNumber <= 6f)
                                { //if 3
                                 //randomly increase by 0% to 100%
                                   float factor = (float)random.NextDouble() + 1f;
                                   weight *= factor;
                                }
                                else if (randomNumber <= 8f)
                                { //if 4
                                 //randomly decrease by 0% to 100%
                                   float factor = (float)random.NextDouble();
                                   weight *= factor;
                                }

                                weights[i][j][k] = weight;*/
                                ($t1 = ($t2 = this.weights[System.Array.index(i, this.weights)])[System.Array.index(j, $t2)])[System.Array.index(k, $t1)] = this.random.NextDouble() * 100 - 50.0;
                            }
                        }
                    }
                }
            }
        }
    });

    Bridge.define("ENN_Snake_Game.SaveData", {
        fields: {
            SavedMember: null
        }
    });

    Bridge.define("ENN_Snake_Game.Snake", {
        fields: {
            px: 0,
            py: 0,
            gs: 0,
            tc: 0,
            ax: 0,
            ay: 0,
            vx: 0,
            vy: 0,
            trail: null,
            tail: 0,
            distance: 0,
            newDistance: 0,
            oldDistance: 0,
            score: 0,
            die: 0,
            wallUp: 0,
            wallDown: 0,
            wallLeft: 0,
            wallRight: 0,
            foodUp: 0,
            foodDown: 0,
            foodLeft: 0,
            foodRight: 0,
            bodyUp: 0,
            bodyDown: 0,
            bodyLeft: 0,
            bodyRight: 0,
            aliveTime: 0,
            inputList: null,
            timer: null
        },
        ctors: {
            init: function () {
                this.px = 10;
                this.py = 10;
                this.gs = 20;
                this.tc = 20;
                this.ax = 15;
                this.ay = 15;
                this.vx = 0;
                this.vy = 0;
                this.tail = 3;
                this.distance = 0;
                this.newDistance = 0;
                this.oldDistance = 0;
                this.score = 0;
                this.die = 0;
                this.bodyUp = 200;
                this.bodyDown = 200;
                this.bodyLeft = 200;
                this.bodyRight = 200;
                this.aliveTime = 2800;
                this.inputList = new (System.Collections.Generic.List$1(System.Single)).ctor();
            }
        },
        methods: {
            StartGame: function (a) {
                var canv = document.getElementById("gc" + a);
                var ctx = canv.getContext("2d");
                this.Reset(canv,ctx,a);


            },
            Reset: function (canv,ctx,a) {
                this.px = 10;
                this.py = 10;
                this.gs = 20;
                this.tc = 20;
                this.aliveTime = 2800;
                this.vx = 0;
                this.vy = 0;
                this.trail = [];
                this.tail = 3;

                this.distance = 0;
                this.newDistance = 0;
                this.oldDistance = 0;
                this.score = 0;
                this.die = 0;
                var randomX = Math.floor(Math.random() * this.tc);
                   var randomY = Math.floor(Math.random() * this.tc);
                   for (var i = 1; i < this.trail.length; i++)
                   {
                       if (this.trail[i].x == randomX && this.trail[i].y == randomY)
                       {
                           randomX = Math.floor(Math.random() * this.tc);
                           randomY = Math.floor(Math.random() * this.tc);
                       }
                   }
                   this.ax = randomX;
                   this.ay = randomY;

                ctx.fillStyle = "black"; // set background color
                ctx.fillRect(0, 0, canv.width, canv.height);

                ctx.fillStyle = "green";
                for (var i = 0; i < this.trail.length; i++)
                {
                   ctx.fillRect(this.trail[i].x * this.gs, this.trail[i].y * this.gs, this.gs - 2, this.gs - 2);
                }

                ctx.fillStyle = "red";
                ctx.fillRect(this.ax * this.gs, this.ay * this.gs, this.gs - 2, this.gs - 2);
                
            },
            Game: function (canv,ctx,a) {
                this.aliveTime -= 25;
                this.score += 0.25;
                this.px += this.vx;
                this.py += this.vy;
                if (this.px < 0 || this.px > this.tc - 1 || this.py < 0 || this.py > this.tc - 1) {
                    this.die = 1;
                    this.timer.Change(-1, -1);

                }

                ctx.fillStyle = "black"; // set background color
                ctx.fillRect(0, 0, canv.width, canv.height);

                ctx.fillStyle = "green";
                for (var i = 0; i < this.trail.length; i++)
                {
                   ctx.fillRect(this.trail[i].x * this.gs, this.trail[i].y * this.gs, this.gs - 2, this.gs - 2);
                   if (this.trail.length > 3)
                   {
                       if (this.trail[i].x == this.px && this.trail[i].y == this.py)
                       {
                           this.die = 1;
                           this.timer.Change(-1,-1);

                       }
                   }
                }
                this.trail.push({x:this.px, y:this.py});
                		    while(this.trail.length>this.tail){
                			    this.trail.shift();
                		    }

                if (this.ax === this.px && this.ay === this.py) {
                    this.tail++;
                    this.score += 10;
                    this.aliveTime += 2500;
                    var randomX = Math.floor(Math.random() * this.tc);
                    var randomY = Math.floor(Math.random() * this.tc);
                    for (var i = 1; i < this.trail.length; i++)
                    {
                       if (this.trail[i].x == randomX && this.trail[i].y == randomY)
                       {
                           randomX = Math.floor(Math.random() * this.tc);
                           randomY = Math.floor(Math.random() * this.tc);
                       }
                    }
                    this.ax = randomX;
                    this.ay = randomY;
                }

                this.distance = Math.sqrt(Math.pow((this.ax - this.px), 2) + Math.pow((this.ay - this.py), 2));
                this.newDistance = this.distance;
                if (this.newDistance > this.oldDistance) {
                    this.score -= 1.5;
                } else {
                    this.score += 1.0;
                }
                this.oldDistance = this.distance;
                if (this.aliveTime <= 0.0){ this.die = 1; this.timer.Change(-1,-1); }
                ctx.fillStyle = "red";
                ctx.fillRect(this.ax * this.gs, this.ay * this.gs, this.gs - 2, this.gs - 2);



            },
            GetInput: function () {
                this.wallUp = 1 - this.py / (this.tc - 1);
                this.wallDown = this.py / (this.tc - 1);
                this.wallLeft = 1 - this.px / (this.tc - 1);
                this.wallRight = this.px / (this.tc - 1);

                var minUp = this.tc - 1;
                var minDown = this.tc - 1;
                var minLeft = this.tc - 1;
                var minRight = this.tc - 1;


                if (this.ax == this.px)
                {
                   if (this.ay > this.py)
                   { // food above head
                       if (Math.abs(this.ay - this.py) > minUp)
                       {

                       }
                       minUp = Math.abs(this.ay - this.py);
                   }
                   else if (this.ay < this.py)
                   { //food below head
                       if (Math.abs(this.ay - this.py) > minDown)
                       {

                       }
                       minDown = Math.abs(this.ay - this.py);
                   }
                }
                if (this.ay == this.py)
                {
                   if (this.ax > this.px)
                   { // food left of head
                       if (Math.abs(this.ax - this.px) > minLeft)
                       {

                       }
                       minLeft = Math.abs(this.ax - this.px);
                   }
                   else if (this.ax < this.px)
                   { //food right of head
                       if (Math.abs(this.ax - this.px) > minRight)
                       {

                       }
                       minRight = Math.abs(this.ax - this.px);
                   }
                }

                this.foodUp = 1 - minDown / (this.tc - 1);
                this.foodDown = 1 - minUp / (this.tc - 1);
                this.foodLeft = 1 - minRight / (this.tc - 1);
                this.foodRight = 1 - minLeft / (this.tc - 1);





                minUp = this.tc - 1;
                minDown = this.tc - 1;
                minLeft = this.tc - 1;
                minRight = this.tc - 1;

                for (var i = 0; i < this.trail.length - 1; i++)
                {

                   if (this.trail[i].x == this.px)
                   {

                       if (this.trail[i].y > this.py)
                       {//body above head
                           if (Math.abs(this.trail[i].y - this.py) > minUp)
                           {

                           }
                           minUp = Math.abs(this.trail[i].y - this.py);

                       }
                       else if (this.trail[i].y < this.py)
                       {//body below head
                           if (Math.abs(this.trail[i].y - this.py) > minDown)
                           {

                           }
                           minDown = Math.abs(this.trail[i].y - this.py);
                       }

                   }

                   if (this.trail[i].y == this.py)
                   {
                       if (this.trail[i].x > this.px)
                       {//body left of head
                           if (Math.abs(this.trail[i].x - this.px) > minLeft)
                           {

                           }
                           minLeft = Math.abs(this.trail[i].x - this.px);

                       }
                       else if (this.trail[i].x < this.px)
                       {//body right of head
                           if (Math.abs(this.trail[i].x - this.px) > minRight)
                           {

                           }
                           minRight = Math.abs(this.trail[i].x - this.px);
                       }
                   }

                }


                this.bodyUp = 1 - minDown / (this.tc - 1);
                this.bodyDown = 1 - minUp / (this.tc - 1);
                this.bodyLeft = 1 - minRight / (this.tc - 1);
                this.bodyRight = 1 - minLeft / (this.tc - 1);


                this.inputList.clear();

                this.inputList.add(this.wallUp);
                this.inputList.add(this.wallDown);
                this.inputList.add(this.wallLeft);
                this.inputList.add(this.wallRight);
                this.inputList.add(this.bodyUp);
                this.inputList.add(this.bodyDown);
                this.inputList.add(this.bodyLeft);
                this.inputList.add(this.bodyRight);
                this.inputList.add(this.foodUp);
                this.inputList.add(this.foodDown);
                this.inputList.add(this.foodLeft);
                this.inputList.add(this.foodRight);
                var inputs = this.inputList.ToArray();


                return inputs;


            },
            Decision: function (member) {
                var $t;
                var outputs = member.FeedFoward(this.GetInput());
                var maxValue = System.Linq.Enumerable.from(outputs, System.Float).max();
                var maxIndex = ($t = System.Single, System.Linq.Enumerable.from(outputs, $t).toList($t)).indexOf(maxValue);

                switch (maxIndex) {
                    case 0: 
                        if (this.vx === 1) {
                        } else {
                            this.vx = -1;
                            this.vy = 0;
                        }
                        break;
                    case 1: 
                        if (this.vx === -1) {
                        } else {
                            this.vx = 1;
                            this.vy = 0;
                        }
                        break;
                    case 2: 
                        if (this.vy === 1) {
                        } else {
                            this.vx = 0;
                            this.vy = -1;
                        }
                        break;
                    case 3: 
                        if (this.vy === -1) {
                        } else {
                            this.vx = 0;
                            this.vy = 1;
                        }
                        break;
                }
            },
            LoopGame: function (a, member, ms) {
                var startTimeSpan = System.TimeSpan.zero;
                var periodTimeSpan = System.TimeSpan.fromMilliseconds(ms);
                var canv = document.getElementById("gc" + a);
                var ctx = canv.getContext("2d");

                this.timer = new System.Threading.Timer.$ctor3(Bridge.fn.bind(this, function (e) {
                    this.Game(canv,ctx,a);
                    this.Decision(member);
                }), null, startTimeSpan, periodTimeSpan);


            }
        }
    });

    Bridge.define("ENN_Snake_Game.StartGame", {
        main: function Main () {
            var button = document.getElementById("BUTTON");
            if (button.addEventListener)
            {
               ENN_Snake_Game.StartGame.Tu = new ENN_Snake_Game.StartGame();
               button.addEventListener('click', function(){ ENN_Snake_Game.StartGame.Tu.Start(); });
            }

        },
        statics: {
            fields: {
                Tu: null
            }
        },
        fields: {
            populationSize: 0,
            mutationRate: 0,
            elitism: 0,
            filePath: null,
            ga: null,
            nn: null,
            timer: null,
            random: null,
            SnakeList: null,
            deathCount: 0
        },
        ctors: {
            init: function () {
                this.populationSize = 220;
                this.mutationRate = 0.05;
                this.elitism = 5;
                this.filePath = "D:\\SELF LEARNING\\ENN Snake Game\\";
                this.deathCount = 0;
            }
        },
        methods: {
            Start: function () {
                this.random = new System.Random.ctor();

                this.SnakeList = new (System.Collections.Generic.List$1(ENN_Snake_Game.Snake)).$ctor2(this.populationSize);

                this.ga = new ENN_Snake_Game.GA(this.populationSize, this.random, this.elitism, this.mutationRate, Bridge.fn.cacheBind(this, this.FitnessFunction), 0, 5, this.filePath);

                for (var i = 0; i < this.ga.Population.Count; i = (i + 1) | 0) {
                    this.SnakeList.add(new ENN_Snake_Game.Snake());
                    this.SnakeList.getItem(i).StartGame(i);
                    this.SnakeList.getItem(i).LoopGame(i, this.ga.Population.getItem(i), 25);

                }
                document.getElementById("Generation").innerHTML = this.ga.Generation;
                document.getElementById("BestGenes").innerHTML = this.ga.BestGenes;
                document.getElementById("fitness").innerHTML = this.ga.BestFitness;

                var startTimeSpan = System.TimeSpan.zero;
                var periodTimeSpan = System.TimeSpan.fromMilliseconds(20);

                this.timer = new System.Threading.Timer.$ctor3(Bridge.fn.bind(this, function (e) {
                    this.deathCount = 0;
                    for (var i1 = 0; i1 < this.populationSize; i1 = (i1 + 1) | 0) {
                        this.FitnessFunction(i1);
                        this.deathCount = (this.deathCount + this.SnakeList.getItem(i1).die) | 0;
                    }
                    ;
                    if (this.deathCount === this.populationSize) {
                        this.timer.Change(-1, -1);
                        this.deathCount = 0;
                        this.Update();
                    }
                    ;
                }), null, startTimeSpan, periodTimeSpan);

            },
            Update: function () {
                this.ga.NewGeneration();

                for (var i = 0; i < this.ga.Population.Count; i = (i + 1) | 0) {
                    this.SnakeList.getItem(i).StartGame(i);
                    this.SnakeList.getItem(i).LoopGame(i, this.ga.Population.getItem(i), 25);
                }
                document.getElementById("Generation").innerHTML = this.ga.Generation;
                document.getElementById("BestGenes").innerHTML = this.ga.BestGenes;
                document.getElementById("fitness").innerHTML = this.ga.BestFitness;

                var startTimeSpan = System.TimeSpan.zero;
                var periodTimeSpan = System.TimeSpan.fromMilliseconds(20);
                this.timer = new System.Threading.Timer.$ctor3(Bridge.fn.bind(this, function (e) {
                    this.deathCount = 0;
                    for (var i1 = 0; i1 < this.populationSize; i1 = (i1 + 1) | 0) {
                        this.FitnessFunction(i1);
                        this.deathCount = (this.deathCount + this.SnakeList.getItem(i1).die) | 0;
                    }
                    ;
                    if (this.deathCount === this.populationSize) {
                        this.timer.Change(-1, -1);
                        this.deathCount = 0;
                        this.Update();
                    }
                    ;
                }), null, startTimeSpan, periodTimeSpan);

            },
            FitnessFunction: function (index) {
                return this.SnakeList.getItem(index).score;
            },
            UpdateText: function (bestGenes, bestFitness, generation) {

            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJFTk4gU25ha2UgR2FtZS5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiRmlsZVJlYWRXcml0ZS5jcyIsIkdBLmNzIiwiTmV1cmFsTmV0d29yay5jcyIsIlNuYWtlLmNzIiwiQXBwLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzJDQWlCMkNBLEdBQUdBLFVBQWlCQSxlQUFpQkE7O29CQUVwRUEsYUFBb0JBO29CQUNwQkE7d0JBRUlBLDRCQUE0QkEsNENBQTRCQTt3QkFDeERBLFNBQVNBLElBQUlBLDhCQUFhQSxVQUFVQTt3QkFDcENBLGdCQUFhQTs7d0JBSWJBLElBQUlBLFVBQVVBOzRCQUNWQTs7Ozs7Ozs7Ozs7Ozs7Ozs0Q0FXcUJBLEdBQUdBO29CQUVoQ0EsYUFBb0JBO29CQUNwQkE7d0JBRUlBLFNBQVNBLElBQUlBLDhCQUFhQTt3QkFDMUJBLG1CQUFtQkE7d0JBQ25CQSxPQUFPQSw4Q0FBaUNBLGNBQUhBOzt3QkFJckNBLElBQUlBLFVBQVVBOzRCQUNWQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQkM3QllBOzs0QkFLZEEsZ0JBQW9CQSxRQUFlQSxTQUFhQSxjQUFvQkEsaUJBQWlDQSxtQkFBdUJBLFdBQWVBOztnQkFFakpBLGNBQWNBO2dCQUNkQSxlQUFlQTtnQkFDZkEsb0JBQW9CQTtnQkFDcEJBLGlCQUFpQkE7Z0JBQ2pCQSx5QkFBeUJBO2dCQUN6QkEsc0JBQXNCQTtnQkFDdEJBLGdCQUFnQkE7Z0JBQ2hCQTs7Z0JBRUFBLGtCQUFhQSxLQUFJQSx3RUFBb0JBO2dCQUNyQ0EscUJBQWdCQSxLQUFJQSx3RUFBb0JBOztnQkFFeENBLEtBQUtBLFdBQVdBLElBQUlBLGdCQUFnQkE7b0JBRWhDQSxJQUFJQSxJQUFJQTt3QkFFSkEsSUFBSUE7O3dCQUNKQSxjQUFTQTs7b0JBRWJBLG9CQUFlQSxJQUFJQSw2QkFBY0EsY0FBU0EsUUFBUUE7Ozs7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QUVyQ0EsbUJBQWNBLElBQUlBO29CQUNsQkEsdUJBQVVBLGFBQWFBO29CQUN2QkEsdUJBQVVBLFlBQVlBLEdBQUdBLDJCQUFjQTs7Ozs7OztnQkFPM0NBLG9CQUFvQkE7Z0JBQ3BCQSxxQkFBcUJBOztnQkFFckJBLGFBQVFBLElBQUlBLDhCQUFNQSwrQkFBQ0E7b0JBRWZBO29CQUNBQSxLQUFLQSxZQUFXQSxLQUFJQSxxQkFBZ0JBO3dCQUVoQ0EscUJBQWdCQTt3QkFDaEJBLHFDQUFjQSx1QkFBVUE7O29CQUMzQkE7b0JBQ0RBLElBQUlBLG9CQUFjQTt3QkFBa0JBLGtCQUFhQSxJQUFrQkE7d0JBQW1CQTt3QkFBZ0JBOztvQkFBV0E7b0JBQ2xIQSxNQUFNQSxlQUFlQTs7OztnQkFNeEJBOztnQkFFQUEsS0FBS0EsV0FBV0EsSUFBSUEsMEJBQXFCQTtvQkFFckNBLHVCQUFVQSxhQUFhQTtvQkFDdkJBLHVCQUFVQSxZQUFZQSxHQUFHQSwyQkFBY0E7Ozs7OztnQkFNM0NBLG9CQUFvQkE7Z0JBQ3BCQSxxQkFBcUJBO2dCQUNyQkEsYUFBUUEsSUFBSUEsOEJBQU1BLCtCQUFDQTtvQkFFZkE7b0JBQ0FBLEtBQUtBLFlBQVdBLEtBQUlBLHFCQUFnQkE7d0JBRWhDQSxxQkFBZ0JBO3dCQUNoQkEscUNBQWNBLHVCQUFVQTs7b0JBQzNCQTtvQkFDREEsSUFBSUEsb0JBQWNBO3dCQUFrQkEsa0JBQWFBLElBQWtCQTt3QkFBbUJBO3dCQUFnQkE7O29CQUFXQTtvQkFDbEhBLE1BQU1BLGVBQWVBOzs7dUNBS0NBO2dCQUV4QkEsT0FBT0EsdUJBQVVBOztrQ0FHRUEsV0FBdUJBLGFBQW1CQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBTeXN0ZW0uSU87XHJcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcclxuXHJcbm5hbWVzcGFjZSBFTk5fU25ha2VfR2FtZVxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIEZpbGVSZWFkV3JpdGVcclxuICAgIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFdyaXRlcyB0aGUgZ2l2ZW4gb2JqZWN0IGluc3RhbmNlIHRvIGEgSnNvbiBmaWxlLlxyXG4gICAgICAgIC8vLyA8cGFyYT5PYmplY3QgdHlwZSBtdXN0IGhhdmUgYSBwYXJhbWV0ZXJsZXNzIGNvbnN0cnVjdG9yLjwvcGFyYT5cclxuICAgICAgICAvLy8gPHBhcmE+T25seSBQdWJsaWMgcHJvcGVydGllcyBhbmQgdmFyaWFibGVzIHdpbGwgYmUgd3JpdHRlbiB0byB0aGUgZmlsZS4gVGhlc2UgY2FuIGJlIGFueSB0eXBlIHRob3VnaCwgZXZlbiBvdGhlciBjbGFzc2VzLjwvcGFyYT5cclxuICAgICAgICAvLy8gPHBhcmE+SWYgdGhlcmUgYXJlIHB1YmxpYyBwcm9wZXJ0aWVzL3ZhcmlhYmxlcyB0aGF0IHlvdSBkbyBub3Qgd2FudCB3cml0dGVuIHRvIHRoZSBmaWxlLCBkZWNvcmF0ZSB0aGVtIHdpdGggdGhlIFtKc29uSWdub3JlXSBhdHRyaWJ1dGUuPC9wYXJhPlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRcIj5UaGUgdHlwZSBvZiBvYmplY3QgYmVpbmcgd3JpdHRlbiB0byB0aGUgZmlsZS48L3R5cGVwYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJmaWxlUGF0aFwiPlRoZSBmaWxlIHBhdGggdG8gd3JpdGUgdGhlIG9iamVjdCBpbnN0YW5jZSB0by48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm9iamVjdFRvV3JpdGVcIj5UaGUgb2JqZWN0IGluc3RhbmNlIHRvIHdyaXRlIHRvIHRoZSBmaWxlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXBwZW5kXCI+SWYgZmFsc2UgdGhlIGZpbGUgd2lsbCBiZSBvdmVyd3JpdHRlbiBpZiBpdCBhbHJlYWR5IGV4aXN0cy4gSWYgdHJ1ZSB0aGUgY29udGVudHMgd2lsbCBiZSBhcHBlbmRlZCB0byB0aGUgZmlsZS48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBXcml0ZVRvSnNvbkZpbGU8VD4oc3RyaW5nIGZpbGVQYXRoLCBUIG9iamVjdFRvV3JpdGUsIGJvb2wgYXBwZW5kID0gZmFsc2UpIHdoZXJlIFQgOiBuZXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dFdyaXRlciB3cml0ZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB0cnlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRlbnRzVG9Xcml0ZVRvRmlsZSA9IEpzb25Db252ZXJ0LlNlcmlhbGl6ZU9iamVjdChvYmplY3RUb1dyaXRlKTtcclxuICAgICAgICAgICAgICAgIHdyaXRlciA9IG5ldyBTdHJlYW1Xcml0ZXIoZmlsZVBhdGgsIGFwcGVuZCk7XHJcbiAgICAgICAgICAgICAgICB3cml0ZXIuV3JpdGUoY29udGVudHNUb1dyaXRlVG9GaWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmaW5hbGx5XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh3cml0ZXIgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB3cml0ZXIuQ2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZWFkcyBhbiBvYmplY3QgaW5zdGFuY2UgZnJvbSBhbiBKc29uIGZpbGUuXHJcbiAgICAgICAgLy8vIDxwYXJhPk9iamVjdCB0eXBlIG11c3QgaGF2ZSBhIHBhcmFtZXRlcmxlc3MgY29uc3RydWN0b3IuPC9wYXJhPlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDx0eXBlcGFyYW0gbmFtZT1cIlRcIj5UaGUgdHlwZSBvZiBvYmplY3QgdG8gcmVhZCBmcm9tIHRoZSBmaWxlLjwvdHlwZXBhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImZpbGVQYXRoXCI+VGhlIGZpbGUgcGF0aCB0byByZWFkIHRoZSBvYmplY3QgaW5zdGFuY2UgZnJvbS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5SZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBvYmplY3QgcmVhZCBmcm9tIHRoZSBKc29uIGZpbGUuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBSZWFkRnJvbUpzb25GaWxlPFQ+KHN0cmluZyBmaWxlUGF0aCkgd2hlcmUgVCA6IG5ldygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUZXh0UmVhZGVyIHJlYWRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIHRyeVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZWFkZXIgPSBuZXcgU3RyZWFtUmVhZGVyKGZpbGVQYXRoKTtcclxuICAgICAgICAgICAgICAgIHZhciBmaWxlQ29udGVudHMgPSByZWFkZXIuUmVhZFRvRW5kKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSnNvbkNvbnZlcnQuRGVzZXJpYWxpemVPYmplY3Q8VD4oZmlsZUNvbnRlbnRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmaW5hbGx5XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZWFkZXIgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICByZWFkZXIuQ2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBOZXd0b25zb2Z0Lkpzb247XHJcbnVzaW5nIFN5c3RlbS5JTztcclxuXHJcblxyXG5uYW1lc3BhY2UgRU5OX1NuYWtlX0dhbWVcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEdBXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIExpc3Q8TmV1cmFsTmV0d29yaz4gUG9wdWxhdGlvbiB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwcml2YXRlIExpc3Q8TmV1cmFsTmV0d29yaz4gbmV3UG9wdWxhdGlvbjtcclxuICAgICAgICBwdWJsaWMgaW50IEdlbmVyYXRpb24geyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGZsb2F0IEJlc3RGaXRuZXNzIHsgZ2V0OyBwcml2YXRlIHNldDsgfSAvLyBDcmVhdGUgYSBmbG9hdCB2YXJpYWJsZSB0byBjb250YWluIHRoZSBiZXN0IGZpdG5lc3Mgb2YgdGhlIHBvcHVsYXRpb25cclxuICAgICAgICBwdWJsaWMgZmxvYXRbXVtdW10gQmVzdEdlbmVzIHsgZ2V0OyBwcml2YXRlIHNldDsgfSAvLyBDcmVhdGUgYSBzdHJpbmcgdmFyaWFibGUgdG8gY29udGFpbiB0aGUgYmVzdCBnZW5lXHJcbiAgICAgICAgcHVibGljIGludCBlbGl0aXNtO1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBtdXRhdGlvblJhdGU7XHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdCBmaXRuZXNzU3VtO1xyXG4gICAgICAgIHByaXZhdGUgaW50IHNhdmVHZW5lcztcclxuICAgICAgICBwcml2YXRlIGludCBsb2FkRXh0ZXJuYWxHZW5lcztcclxuICAgICAgICBwcml2YXRlIGludCBwb3B1bGF0aW9uU2l6ZTtcclxuICAgICAgICBwcml2YXRlIHN0cmluZyBmaWxlUGF0aDtcclxuICAgICAgICBcclxuICAgICAgICBwcml2YXRlIGludFtdIG5uTGF5ZXIgPSBuZXcgaW50WzNdIHsgMTIsIDEwLCA0IH07IC8vIDEyLTktMTEtNCBOTiBhcmNoaXRlY3QuIEkganVzdCBjaG9vc2UgcmFuZG9tIGFyY2hpdGVjdCBmb3Igc2ltcGxpdHlcclxuICAgICAgICBwcml2YXRlIFJhbmRvbSByYW5kb207XHJcbiAgICAgICAgcHVibGljIE5ldXJhbE5ldHdvcmsgYmVzdE5ldHdvcms7XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgR0EoaW50IHBvcHVsYXRpb25TaXplLCBSYW5kb20gcmFuZG9tLCBpbnQgZWxpdGlzbSwgZmxvYXQgbXV0YXRpb25SYXRlLCBGdW5jPGludCxmbG9hdD4gZml0bmVzc0Z1bmN0aW9uLCBpbnQgbG9hZEV4dGVybmFsR2VuZXMsIGludCBzYXZlR2VuZXMsIHN0cmluZyBmaWxlUGF0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmFuZG9tID0gcmFuZG9tO1xyXG4gICAgICAgICAgICB0aGlzLmVsaXRpc20gPSBlbGl0aXNtO1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uUmF0ZSA9IG11dGF0aW9uUmF0ZTtcclxuICAgICAgICAgICAgdGhpcy5zYXZlR2VuZXMgPSBzYXZlR2VuZXM7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEV4dGVybmFsR2VuZXMgPSBsb2FkRXh0ZXJuYWxHZW5lcztcclxuICAgICAgICAgICAgdGhpcy5wb3B1bGF0aW9uU2l6ZSA9IHBvcHVsYXRpb25TaXplO1xyXG4gICAgICAgICAgICB0aGlzLmZpbGVQYXRoID0gZmlsZVBhdGg7XHJcbiAgICAgICAgICAgIEdlbmVyYXRpb24gPSAxO1xyXG5cclxuICAgICAgICAgICAgUG9wdWxhdGlvbiA9IG5ldyBMaXN0PE5ldXJhbE5ldHdvcms+KHBvcHVsYXRpb25TaXplKTsgLy8gSW1wcm92ZWQgY29kZSBmcm9tIHRoZSBsaW5lIGFib3ZlLiBUaGlzIG1ha2VzIHRoZSBwcm9ncmFtIGRvZXNuJ3QgaGF2ZSB0byByZXNpemUgdGhlIHBvcHVsYXRpb24gd2hlbiBhZGRpbmcgZG5hLlxyXG4gICAgICAgICAgICBuZXdQb3B1bGF0aW9uID0gbmV3IExpc3Q8TmV1cmFsTmV0d29yaz4ocG9wdWxhdGlvblNpemUpOyAvLyBJbXByb3ZlZCBjb2RlLiBDcmVhdGUgYSBuZXcgcG9wdWxhdGlvbiBsaXN0LlxyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBwb3B1bGF0aW9uU2l6ZTsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA8IGxvYWRFeHRlcm5hbEdlbmVzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWxlUGF0aCA9PSBcIlwiKSB7IH1cclxuICAgICAgICAgICAgICAgICAgICBMb2FkRGF0YShmaWxlUGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBQb3B1bGF0aW9uLkFkZChuZXcgTmV1cmFsTmV0d29yayhubkxheWVyLCByYW5kb20sIGZpdG5lc3NGdW5jdGlvbikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBOZXdHZW5lcmF0aW9uKCkgLy9DcmVhdGUgbmV3IHBvcHVsYXRpb24gYmFzZWQgb24gdGhlIGZpdG5lc3Mgb2YgdGhlIHByZXZpb3VzIFBPUFVMQVRJT04gKE5PVCBETkEhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKFBvcHVsYXRpb24uQ291bnQgPD0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIENhbGN1bGF0ZVBvcHVsYXRpb25GaXRuZXNzKCk7IC8vQ2FsbCB0aGUgZnVuY3Rpb24gY2FsY3VsYXRpbmcgZml0bmVzcyBvZiB0aGUgcHJldmlvdXMgUE9QVUxBVElPTiAoTk9UIEROQSEpXHJcbiAgICAgICAgICAgIFBvcHVsYXRpb24uU29ydCgoQ29tcGFyaXNvbjxOZXVyYWxOZXR3b3JrPilDb21wYXJlRE5BKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChHZW5lcmF0aW9uICUgNTAwID09IDApIHtcclxuICAgICAgICAgICAgICAgIFNhdmVEYXRhKGZpbGVQYXRoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTGlzdDxETkE8VD4+IG5ld1BvcHVsYXRpb24gPSBuZXcgTGlzdDxETkE8VD4+KCk7XHJcbiAgICAgICAgICAgIG5ld1BvcHVsYXRpb24uQ2xlYXIoKTsgLy8gSW1wcm92ZWQgY29kZS4gVGhlIG9sZCBwb3B1bGF0aW9uIHdoaWNoIHRoaXMgbmV3IGxpc3QgbWF5IGhvbGQgZnJvbSB0aGUgcHJldmlvdXMgZ2VuZXJhdGlvbi9wb3B1bGF0aW9uIHdpbGwgYmUgY2xlYXJlZC5cclxuXHJcbiAgICAgICAgICAgIC8vQ3Jvc3NvdmVyIGxvb3AgaW5jbHVkaW5nIG11dGF0aW9uXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgUG9wdWxhdGlvbi5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA8IGVsaXRpc20pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3UG9wdWxhdGlvbi5BZGQoUG9wdWxhdGlvbltpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgTmV1cmFsTmV0d29yayBwYXJlbnQxID0gQ2hvb3NlUGFyZW50KCk7IC8vIFRoaXMgZnVuY3Rpb24gaXMgZGVmaW5lZCBiZWxvd1xyXG4gICAgICAgICAgICAgICAgICAgIE5ldXJhbE5ldHdvcmsgcGFyZW50MiA9IENob29zZVBhcmVudCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBOZXVyYWxOZXR3b3JrIGNoaWxkID0gcGFyZW50MS5Dcm9zc292ZXIocGFyZW50Mik7IC8vIENyb3Nzb3ZlciBmdW5jdGlvbiBpcyBkZWZpbmVkIGluIE5ldXJhbE5ldHdvcmsuY3NcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuTXV0YXRlKG11dGF0aW9uUmF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1BvcHVsYXRpb24uQWRkKGNoaWxkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIExpc3Q8TmV1cmFsTmV0d29yaz4gdGVtcG9yYXJ5TGlzdCA9IFBvcHVsYXRpb247IC8vIEltcHJvdmVkIGNvZGUuIFRoZSBwb3B1bGF0aW9uIGxpc3QgaXMgc2F2ZWQgaW4gYSB0ZW1wb3JhcnkgbGlzdC5cclxuICAgICAgICAgICAgUG9wdWxhdGlvbiA9IG5ld1BvcHVsYXRpb247IC8vIFRoZW4sIHRoZSBwb3B1bGF0aW9uIGxpc3QgaXMgcmVwbGFjZWQgYnkgdGhlIG5ldyBwb3B1bGF0aW9uIGxpc3QuIFxyXG4gICAgICAgICAgICBuZXdQb3B1bGF0aW9uID0gdGVtcG9yYXJ5TGlzdDsgLy8gSW1wcm92ZWQgY29kZS4gVGhlbiwgdGhlIG9sZCBwb3B1bGF0aW9uIGxpc3QgaXMgcGFzc2VkIHRvIHRoZSBuZXcgcG9wdWxhdGlvbiBsaXN0IGZyb20gdGhlIHRlbXBvcmFyeSBsaXN0LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyB3YXksIGJvdGggdGhlIG9sZCBhbmQgbmV3IHBvcHVsYXRpb24gbGlzdCBhcmUgc2F2ZWRcclxuXHJcbiAgICAgICAgICAgIEdlbmVyYXRpb24rKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIENhbGN1bGF0ZVBvcHVsYXRpb25GaXRuZXNzKCkgLy8gVGhpcyBmdW5jdGlvbiBjYWxjdWxhdGVzIGZpdG5lc3Mgb2YgYSBQT1BVTEFUSU9OIChOT1QgRE5BISlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZpdG5lc3NTdW0gPSAwO1xyXG4gICAgICAgICAgICBOZXVyYWxOZXR3b3JrIGJlc3QgPSBQb3B1bGF0aW9uWzBdOyAvLyBBc3N1bWUgdGhlIGJlc3QgZG5hIGlzIHRoZSBbMF0gbWVtYmVyIG9mIHRoZSBwb3B1bGF0aW9uXHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IFBvcHVsYXRpb24uQ291bnQ7IGkrKykgLy8gbG9vcCBmcm9tIHRoZSBmaXJzdCB0byB0aGUgbGFzdCBlbGVtZW50IG9mIHRoZSBwb3B1bGF0aW9uXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZpdG5lc3NTdW0gKz0gUG9wdWxhdGlvbltpXS5DYWxjdWxhdGVGaXRuZXNzKGkpOyAvLyBTdW0gb2YgZml0bmVzcyBvZiBhbGwgbWVtYmVyIGluIHRoZSBwb3B1bGF0aW9uXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKFBvcHVsYXRpb25baV0uRml0bmVzcyA+IGJlc3QuRml0bmVzcykgLy8gaWYgdGhlIGRuYSBmaXRuZXNzIG9mIFtpXSBtZW1iZXIgb2YgcG9wdWxhdGlvbiA+IHRoZSBkbmEgZml0bmVzcyBvZiB0aGUgYmVzdCBtZW1iZXJcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBiZXN0ID0gUG9wdWxhdGlvbltpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYmVzdE5ldHdvcmsgPSBiZXN0O1xyXG4gICAgICAgICAgICBCZXN0Rml0bmVzcyA9IGJlc3QuRml0bmVzczsgLy8gUmVjb3JkIHRoZSBiZXN0IGRuYSBmaXRuZXNzIHZhbHVlIGJlZm9yZSBnZW5lcmF0aW5nIG5ldyBwb3B1bGF0aW9uXHJcbiAgICAgICAgICAgIEJlc3RHZW5lcyA9IGJlc3Qud2VpZ2h0czsgLy8gUmVjb3JkIHRoZSBiZXN0IGdlbmUgYmVmb3JlIGdlbmVyYXRpbmcgbmV3IHBvcHVsYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Db3B5VG8gaXMgYSBDIyBmdW5jdGlvbiBjb3B5aW5nIGFuIGFycmF5IHRvIGFub3RoZXIgc3RhcmluZyBhdCBhIGNlcnRhaW4gaW5kZXguIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0luIHRoaXMgY2FzZSwgYSB3aG9sZSBuZXcgZ2VuZSBpcyBjb3BpZWQgdG8gdGhlIG9sZCBnZW5lIHN0YXJ0aW5nIGZyb20gMCB3aGljaCBtZWFucyBvbGQgZ2VuZSBpcyByZXBsYWNlZCBieSBuZXcgZ2VuZS5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IENvbXBhcmVETkEoTmV1cmFsTmV0d29yayBhLCBOZXVyYWxOZXR3b3JrIGIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoYS5GaXRuZXNzID4gYi5GaXRuZXNzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7IC8vIFNvcnQgbWV0aG9kIHdpbGwgYXJyYW5nZSBhIGZpcnN0LCBiIG5leHRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChhLkZpdG5lc3MgPCBiLkZpdG5lc3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxOyAvLyBTb3J0IG1ldGhvZCB3aWxsIGFycmFuZ2UgYiBmaXJzdCwgYSBuZXh0LlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgTmV1cmFsTmV0d29yayBDaG9vc2VQYXJlbnQoKSAvLyBDaG9vc2UgcGFyZW50IChzdWl0YWJsZSBETkEpIHRvIGNyb3Nzb3ZlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZG91YmxlIHJhbmRvbU51bWJlciA9IHJhbmRvbS5OZXh0RG91YmxlKCkgKiBmaXRuZXNzU3VtO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBQb3B1bGF0aW9uLkNvdW50OyBpKyspIC8vIFRoZSBsb29wIHJ1biB0aHJvdWdoIGVhY2ggRE5BIChQb3B1bGF0aW9uW2ldKSBpbiB0aGUgcG9wdWxhdGlvblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmFuZG9tTnVtYmVyIDwgUG9wdWxhdGlvbltpXS5GaXRuZXNzKSAvLyBJZiB0aGUgZml0bmVzcyBvZiB0aGUgW2ldIEROQSBpcyBsYXJnZXIgdGhhbiByYW5kb21OdW1iZXIsIHJldHVybiB0aGUgRE5BXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFBvcHVsYXRpb25baV07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmFuZG9tTnVtYmVyIC09IE1hdGguQWJzKFBvcHVsYXRpb25baV0uRml0bmVzcyk7IC8vIElmIHJhbmRvbU51bWJlciA+IEROQSBmaXRuZXNzLCByYW5kb21OdW1iZXIgPSByYW5kb21OdW1iZXIgLSBETkEgZml0bmVzcy4gVGhlIHJhbmRvbU51bWJlciBpcyByZWR1Y2VkIGZvciB0aGUgbmV4dCBpdGVyYXRpb24uXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsOyAvLyBJZiB0aGVyZSBpcyBubyBzdWl0YWJsZSBwYXJlbnQsIHJldHVybiBudWxsLlxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vIFNhdmluZyBhbmQgUmV0cmlldmluZyBkYXRhXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2F2ZURhdGEoIHN0cmluZyBmaWxlUGF0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNhdmVEYXRhIHNhdmUgPSBuZXcgU2F2ZURhdGEgeyBTYXZlZE1lbWJlciA9IG5ldyBMaXN0PE5ldXJhbE5ldHdvcms+KCkgfTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgc2F2ZUdlbmVzOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNhdmUuU2F2ZWRNZW1iZXIuQWRkKFBvcHVsYXRpb25baV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBGaWxlUmVhZFdyaXRlLldyaXRlVG9Kc29uRmlsZTxFTk5fU25ha2VfR2FtZS5TYXZlRGF0YT4oZmlsZVBhdGgsIHNhdmUgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIExvYWREYXRhKHN0cmluZyBmaWxlUGF0aClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBTYXZlRGF0YSBzYXZlID0gRmlsZVJlYWRXcml0ZS5SZWFkRnJvbUpzb25GaWxlPFNhdmVEYXRhPihmaWxlUGF0aCk7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgbG9hZEV4dGVybmFsR2VuZXM7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUG9wdWxhdGlvbi5BZGQoc2F2ZS5TYXZlZE1lbWJlcltpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nO1xyXG5cclxubmFtZXNwYWNlIEVOTl9TbmFrZV9HYW1lXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBOZXVyYWxOZXR3b3JrXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnRbXSBMYXllcnM7IC8vdGhpcyBmaWVsZCBzdG9yZXMgdGhlIGxheWVyIGluZm9ybWF0aW9uIHdoaWNoIGlzIGFuIDFEIGFycmF5LiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9FeDogWzMgMiAyIDFdIGFycmF5IG1lYW5zIHRoZSBuZXR3b3JrIGhhdmUgNCBsYXllcnMgaW4gdG90YWwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLzFzdCAoaW5wdXQpIGxheWVyIGhhcyAzIG5ldXJvbnMgKG9yIDIgbmV1cm9ucyArIDEgYmlhcyksIDJuZCwgYW5kIDNyZCBsYXllciBoYXZlIDIgbmV1cm9uIChvciAxIG5ldXJvbiArIDEgYmlhcyksIDR0aCAob3V0cHV0KSBsYXllciBoYXMgMSBuZXVyb24uIFxyXG5cclxuICAgICAgICBwcml2YXRlIGZsb2F0W11bXSBuZXVyb25zOyAvL3RoaXMgZmllbGQgc3RvcmVzIHZhbHVlcyBvZiBuZXVyb25zIHdoaWNoIGlzIGEgMkQgYXJyYXk6IFttIGxheWVycyA9IG0gcm93c11bYXJyYXkgb2YgbmV1cm9uIHZhbHVlc10uIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVmlzdWFsIEV4OiBbIFsxIDIgM10gICByb3cgMTogKGFycmF5IGNvbnRhaW5pbmcgdmFsdWVzIG9mIDMgbmV1cm9ucyBpbiAxc3QgbGF5ZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgWzEgMl0gICAgIChhcnJheSBjb250YWluaW5nIHZhbHVlcyBvZiAyIG5ldXJvbnMgaW4gMm5kIGxheWVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIFsxIDJdICAgICAuLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgWzFdICAgIF0gIChhcnJheSBjb250YWluaW5nIHZhbHVlIG9mIDEgbmV1cm9uIGluIDR0aCBsYXllcilcclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0W11bXVtdIHdlaWdodHM7IC8vdGhpcyBmaWVsZCBzdG9yZXMgdmFsdWVzIG9mIHdlaWdodHMgd2hpY2ggaXMgYSAzRCBhcnJheTogWyhtLTEpIHJvd11bbnVtYmVyIG9mIG5ldXJvbiBpbiBsYXllcl1bbnVtYmVyIG9mIHdlaWdodHMgaW4gbmV1cm9uXS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVmlzdWFsIEV4OiBbIFsgWzEgMiAzXSBbXSBdICAgcm93IDE6IChPdXRlciBhcnJheSAoY2FsbGVkIGphZ2dlZCBhcnJheSkgY29udGFpbmluZyBpbm5lciBhcnJheXMgY29udGFpbmluZyB2YWx1ZXMgb2Ygd2VpZ2h0cy4gMXN0IGlubmVyIGFycmF5IGNvbnRhaW5zIHdlaWdodHMgb2YgY29ubmVjdGlvbnMgZnJvbSB7MiBuZXVyb25zICsgMX0gYmlhcyBpbiAxc3QgbGF5ZXIgdG8gMXN0IG5ldXJvbiBpbiAybmQgbGF5ZXIuIFtdIHJlcHJlc2VudHMgYmlhcyBpbiAybmQgbGF5ZXIgd2hpY2ggZG9lc250IGhhdmUgYW55IGluY29taW5nIGNvbm5lY3Rpb24gc28gaXQgaXMgYW4gZW1wdHkgaW5uZXIgYXJyYXkuKSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgWyBbMSAyXSBbXSBdICAgICAgIC4uLi4gICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICBbIFsxIDJdIF0gICAgICBdIGFycmF5IGNvbnRhaW5pbmcgYXJyYXkgY29udGFpbmluZyB2YWx1ZXMgb2Ygd2VpZ2h0cy4gVGhlIGlubmVyIGFycmF5IGNvbnRhaW5zIHdlaWdodHMgb2YgY29ubmVjdGlvbnMgZnJvbSB7MSBuZXVyb24gKyAxIGJpYXN9IGluIDNyZCBsYXllciB0byAxIG5ldXJvbiBpbiA0dGggbGF5ZXIuIE91dHB1dCBsYXllciBkb2VzbnQgaGF2ZSBiaWFzLilcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBSYW5kb20gcmFuZG9tO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBGaXRuZXNzIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHByaXZhdGUgRnVuYzxpbnQsZmxvYXQ+IEZpdG5lc3NGdW5jdGlvbjtcclxuXHJcbiAgICAgICAgcHVibGljIE5ldXJhbE5ldHdvcmsoaW50W10gbGF5ZXJzLCBSYW5kb20gcmFuZG9tLCBGdW5jPGludCxmbG9hdD4gZml0bmVzc0Z1bmN0aW9uKSAvL2NvbnN0cnVjdG9yLiB0aGUgbGF5ZXIgcGFyYW1ldGVyIHRlbGxzIGhvdyBtYW55IGxheWVyIGluIHRoZSBuZXR3b3JrIGFuZCBob3cgbWFueSBuZXVyb24gaW4gZWFjaCBsYXllci5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEZpdG5lc3NGdW5jdGlvbiA9IGZpdG5lc3NGdW5jdGlvbjtcclxuICAgICAgICAgICAgTGF5ZXJzID0gbmV3IGludFtsYXllcnMuTGVuZ3RoXTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9MDsgaSA8IGxheWVycy5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTGF5ZXJzW2ldID0gbGF5ZXJzW2ldOyAvL3N0b3JlIGlucHV0IHRvIGZpZWxkIExheWVyLiBMYXllcltpXSBpcyB0aGUgbnVtYmVyIG9mIG5ldXJvbiBpbiAwIGxheWVyLlxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3JhbmRvbSA9IG5ldyBSYW5kb20oU3lzdGVtLkRhdGVUaW1lLlRvZGF5Lk1pbGxpc2Vjb25kKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmFuZG9tID0gcmFuZG9tO1xyXG5cclxuICAgICAgICAgICAgQ3JlYXRlTmV1cm9ucygpO1xyXG4gICAgICAgICAgICBDcmVhdGVXZWlnaHRzKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENyZWF0ZU5ldXJvbnMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9OZXVyb24gaW5pdGlhbGl6YXRpb25cclxuICAgICAgICAgICAgTGlzdDxmbG9hdFtdPiBuZXVyb25MaXN0ID0gbmV3IExpc3Q8ZmxvYXRbXT4oKTsgLy9jcmVhdGUgYW4gZW1wdHkgbGlzdCBvZiBmbG9hdCBuZXVyb24gYXJyYXlzXHJcbiAgICAgICAgICAgIGZvciAoaW50IGk9MDsgaSA8IExheWVycy5MZW5ndGg7IGkrKykgLy9sb29wIHRocm91Z2ggYWxsIGxheWVyc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuZXVyb25MaXN0LkFkZChuZXcgZmxvYXRbTGF5ZXJzW2ldXSk7IC8vYWRkIGVtcHR5IG5ldXJvbiBhcnJheXMgdG8gdGhlIGVtcHR5IG5ldXJvbiBsaXN0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9XaGVuIHRoZSBsb29wIGZpbmlzaGVzLCB0aGUgbGlzdCB3aWxsIGNvbnRhaW4gc29tZSBudW1iZXIgb2YgZW1wdHkgYXJyYXlzLlxyXG5cclxuICAgICAgICAgICAgbmV1cm9ucyA9IG5ldXJvbkxpc3QuVG9BcnJheSgpOyAvL2NvbnZlcnQgbGlzdCBvZiBhcnJheSB0byBbXVtdIChqYWdnZWQpIGFycmF5IGFuZCBzdG9yZSBpbiBmaWVsZCBuZXVyb25cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBDcmVhdGVXZWlnaHRzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExpc3Q8ZmxvYXRbXVtdPiB3ZWlnaHRMaXN0ID0gbmV3IExpc3Q8ZmxvYXRbXVtdPigpOyAvL2NyZWF0ZSBhbiBlbXB0eSBsaXN0IG9mIGZsb2F0IFtudW1iZXIgb2YgbmV1cm9uIGluIGxheWVyXVtudW1iZXIgb2Ygd2VpZ2h0IGluIG5ldXJvbl0gd2VpZ2h0IGFycmF5c1xyXG4gICAgICAgICAgICBmb3IgKGludCBpPTE7IGk8IExheWVycy5MZW5ndGg7IGkrKykgLy9sb29wIHRocm91Z2ggYWxsIGxheWVycy4gTm90ZTogaSA9IDEgbm90IDAgYmVjYXVzZSBpbnB1dCBsYXllciAwIGRvZXNudCBoYXZlIGluY29taW5nIHdlaWdodFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBMaXN0PGZsb2F0W10+IGxheWVyV2VpZ2h0TGlzdCA9IG5ldyBMaXN0PGZsb2F0W10+KCk7IC8vY3JlYXRlIGFuIGVtcHR5IGxpc3Qgb2Ygd2VpZ2h0IGFycmF5IGZvciB0aGUgY3VycmVudCBsYXllclxyXG4gICAgICAgICAgICAgICAgaW50IG5ldXJvbkluUHJldmlvdXNMYXllciA9IExheWVyc1tpIC0gMV07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaj0wOyBqPCBuZXVyb25zW2ldLkxlbmd0aDsgaisrKSAvLyBsb29wIHRocm91Z2ggYWxsIG5ldXJvbnMgaW4gdGhlIGN1cnJlbnQgbGF5ZXJcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmbG9hdFtdIG5ldXJvbldlaWdodHMgPSBuZXcgZmxvYXRbbmV1cm9uSW5QcmV2aW91c0xheWVyXTsgLy9jcmVhdGUgZW1wdHkgd2VpZ2h0IGFycmF5IHJlcHJlc2VudGluZyBhbGwgY29ubmVjdGlvbnMgZnJvbSBwcmV2aW91cyBsYXllciB0byAxIG5ldXJvbiBpbiB0aGUgY3VycmVudCBsYXllclxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3NldCB0aGUgd2VpZ3RoIHJhbmRvbWx5IGJldHdlZW4gLTEgYW5kIDFcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBrPTA7IGsgPCBuZXVyb25JblByZXZpb3VzTGF5ZXI7IGsrKykgLy9sb29wIHRocm91Z2ggYWxsIG5ldXJvbnMgaW4gdGhlIHByZXZpb3VzIGxheWVyIHRvIHNldHVwIHdlaWdodHMgZm9yIGNvbm5lY3Rpb25zIHRvIDEgbmV1cm9uIGluIHRoZSBjdXJyZW50IHBsYXllclxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9naXZlIHJhbmRvbSB3ZWlnaHRzIHRvIG5ldXJvbiB3ZWlnaHRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldXJvbldlaWdodHNba10gPSAoZmxvYXQpcmFuZG9tLk5leHREb3VibGUoKSoxMDAgLSA1MGY7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsYXllcldlaWdodExpc3QuQWRkKG5ldXJvbldlaWdodHMpOyAvL2FkZCBuZXVyb24gd2VpZ2h0IG9mIDEgbmV1cm9uIGluIHRoaXMgY3VycmVudCBsYXllciB0byBsYXllciB3ZWlnaHQgbGlzdFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9XaGVuIHRoZSBsb29wIGZpbmlzaGVzLCB0aGUgbGlzdCB3aWxsIGNvbnRhaW4gbm9uLWVtcHR5IHdlaWdodCBhcnJheXMgb2YgdGhlIGN1cnJlbnQgbGF5ZXIgXHJcblxyXG4gICAgICAgICAgICAgICAgd2VpZ2h0TGlzdC5BZGQobGF5ZXJXZWlnaHRMaXN0LlRvQXJyYXkoKSk7IC8vY29udmVydCB0aGUgbGF5ZXIgd2VpZ2h0IGxpc3Qgb2YgW10gd2VpZ2h0IGFycmF5cyB0byBbXVtdIGFycmF5IGFuZCBhZGQgdG8gd2VpZ2h0IGxpc3QuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9XaGVuIHRoZSBsb29wIGZpbmlzaGVzLCB0aGUgbGlzdCB3aWxsIGNvbnRhaW4gW11bXSBhcnJheXMgb2YgYWxsIGxheWVyc1xyXG5cclxuICAgICAgICAgICAgd2VpZ2h0cyA9IHdlaWdodExpc3QuVG9BcnJheSgpOyAvL2NvbnZlcnQgd2VpZ2h0IGxpc3Qgb2YgW11bXSBhcnJheXMgdG8gW11bXVtdIGFycmF5IGFuZCBzdG9yZSBpbiBmaWVsZCB3ZWlnaHRzLlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0W10gRmVlZEZvd2FyZChmbG9hdFtdIGlucHV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9BZGQgaW5wdXQgdG8gdGhlIG5ldXJvbiBpbiBpbnB1dCBsYXllciAwXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgaW5wdXQuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5ldXJvbnNbMF1baV0gPSBpbnB1dFtpXTsgLy8gaXRoIGlucHV0ID0gaXRoIG5ldXJvbiBpbiBsYXllciAwLlxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMTsgaSA8IExheWVycy5MZW5ndGg7IGkrKykgLy9sb29wIHRocm91Z2ggYWxsIGxheWVyc1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IG5ldXJvbnNbaV0uTGVuZ3RoOyBqKyspIC8vIGxvb3AgdGhyb3VnaCBhbGwgbmV1cm9ucyBpbiB0aGUgY3VycmVudCBsYXllclxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0IHZhbHVlID0gMC4yNWY7IC8vY3JlYXRlIGEgY29uc3RhbnQgYmlhcyBmb3IgdGhlIHN1bVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGsgPSAwOyBrIDwgbmV1cm9uc1tpLTFdLkxlbmd0aDsgaysrKSAvL2xvb3AgdGhyb3VnaCBhbGwgbmV1cm9uIGluIHRoZSBwcmV2aW91cyBsYXllclxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gd2VpZ2h0c1tpIC0gMV1bal1ba10gKiBuZXVyb25zW2kgLSAxXVtrXTsgLy9zdW0gb2YgW3dlaWdodCB0aW1lcyBuZXVyb24gdmFsdWVdIGZyb20gcHJldmlvdXMgbGF5ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBuZXVyb25zW2ldW2pdID0gMS8oMSsoZmxvYXQpTWF0aC5FeHAoLXZhbHVlKSk7IC8vc2lnbW9pZCBhY3RpdmF0aW9uIHRvIGNvbnZlcnQgdmFsdWUgYmV0d2VlbiAwIGFuZCAxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXVyb25zW25ldXJvbnMuTGVuZ3RoLTFdOyAvL3JldHVybiBvdXRwdXQgbGF5ZXJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIC8qKioqKioqKioqKioqKioqKioqKioqICAgICAgICAgR0VORVRJQyBBTEdPUklUSE0gTUVUSE9EUyAgICAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgQ2FsY3VsYXRlRml0bmVzcyhpbnQgaW5kZXgpIC8vVGhpcyBmdW5jdGlvbiBjYWxjdWxhdGVzIGZpdG5lc3Mgb2YgYSBETkFcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEZpdG5lc3MgPSBGaXRuZXNzRnVuY3Rpb24oaW5kZXgpOyAvLyBGaXRuZXNzIGZ1bmN0aW9uIGlzIGRpZmZlcmVudCBmb3IgZGlmZmVyZW50IHByb2plY3QuXHJcbiAgICAgICAgICAgIHJldHVybiBGaXRuZXNzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE5ldXJhbE5ldHdvcmsgQ3Jvc3NvdmVyKE5ldXJhbE5ldHdvcmsgb3RoZXJQYXJlbnRzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTmV1cmFsTmV0d29yayBjaGlsZCA9IG5ldyBOZXVyYWxOZXR3b3JrKExheWVycywgcmFuZG9tLCBGaXRuZXNzRnVuY3Rpb24pOyAvLyB3aGVuIG5ldyBETkEgaXMgZXhlY3V0ZWQsIEdlbmVzIGFycmF5IGlzIHJlY3JlYXRlZCBidXQgdGhlbiBpdCBpcyBjaGFuZ2VkIGR1ZSB0byBjcm9zc292ZXIuIFRoZXJlZm9yZSwgdGhlIGFycmF5IHJlY3JlYXRpb24gaXMgdW5uZWNjZXNhcnkgYW5kIHRoZSBmbGFnIGlzIG5lZWRlZCBoZXJlLCBpLmUgT25seSBjcm9zc292ZXIgdGhlIG9yaWdpbmFsIGFycmF5LlxyXG5cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCB3ZWlnaHRzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBqID0gMDsgaiA8IHdlaWdodHNbaV0uTGVuZ3RoOyBqKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgayA9IDA7IGsgPCB3ZWlnaHRzW2ldW2pdLkxlbmd0aDsgaysrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQud2VpZ2h0c1tpXVtqXVtrXSA9IHJhbmRvbS5OZXh0RG91YmxlKCkgPCAwLjUgPyB3ZWlnaHRzW2ldW2pdW2tdIDogb3RoZXJQYXJlbnRzLndlaWdodHNbaV1bal1ba107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qVGhlIGFib3ZlIGxpbmUgaXMgZXF1aXZhbGVudCB0bzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhbmRvbS5OZXh0RG91YmxlKCkgPCAwLjUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLndlaWdodHNbaV1bal1ba10gPSB3ZWlnaHRzW2ldW2pdW2tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQud2VpZ2h0c1tpXVtqXVtrXSA9IG90aGVyUGFyZW50cy53ZWlnaHRzW2ldW2pdW2tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjaGlsZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE11dGF0ZShmbG9hdCBtdXRhdGlvblJhdGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHdlaWdodHMuTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgd2VpZ2h0c1tpXS5MZW5ndGg7IGorKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBrID0gMDsgayA8IHdlaWdodHNbaV1bal0uTGVuZ3RoOyBrKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFuZG9tLk5leHREb3VibGUoKSA8IG11dGF0aW9uUmF0ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLypmbG9hdCB3ZWlnaHQgPSB3ZWlnaHRzW2ldW2pdW2tdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbXV0YXRlIHdlaWdodCB2YWx1ZSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsb2F0IHJhbmRvbU51bWJlciA9IChmbG9hdClyYW5kb20uTmV4dERvdWJsZSgpICogNTA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhbmRvbU51bWJlciA8PSAyZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgLy9pZiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZmxpcCBzaWduIG9mIHdlaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlaWdodCAqPSAtMWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyYW5kb21OdW1iZXIgPD0gNGYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IC8vaWYgMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3BpY2sgcmFuZG9tIHdlaWdodCBiZXR3ZWVuIC0xIGFuZCAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VpZ2h0ID0gKGZsb2F0KXJhbmRvbS5OZXh0RG91YmxlKCkgKiAyIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJhbmRvbU51bWJlciA8PSA2ZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgLy9pZiAzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmFuZG9tbHkgaW5jcmVhc2UgYnkgMCUgdG8gMTAwJVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IChmbG9hdClyYW5kb20uTmV4dERvdWJsZSgpICsgMWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VpZ2h0ICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJhbmRvbU51bWJlciA8PSA4ZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgLy9pZiA0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmFuZG9tbHkgZGVjcmVhc2UgYnkgMCUgdG8gMTAwJVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IChmbG9hdClyYW5kb20uTmV4dERvdWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlaWdodCAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VpZ2h0c1tpXVtqXVtrXSA9IHdlaWdodDsqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VpZ2h0c1tpXVtqXVtrXSA9IChmbG9hdClyYW5kb20uTmV4dERvdWJsZSgpICogMTAwIC0gNTBmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIFxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZztcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBFTk5fU25ha2VfR2FtZVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgU25ha2VcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgcHggPSAxMDtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgcHkgPSAxMDtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgZ3MgPSAyMDtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgdGMgPSAyMDtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgYXggPSAxNTtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgYXkgPSAxNTsgLy9zZXQgaW5pdGlhbCB4LXkgY29yZGluYXRlIG9mIHRoZSBhcHBsZVxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCB2eCA9IDA7XHJcbiAgICAgICAgcHVibGljIGZsb2F0IHZ5ID0gMDsgLy8gc2V0IGluaXRpYWwgeC15IHZlbG9jaXR5IG9mIHRoZSBzbmFrZVxyXG4gICAgICAgIHByaXZhdGUgZmxvYXRbXSB0cmFpbDtcclxuXHRcdHByaXZhdGUgZmxvYXQgdGFpbCA9IDM7IC8vaW50aWFsIGxlbmd0aCBvZiB0aGUgc25ha2UqLyBcclxuICAgICAgICBcclxuICAgICAgICBwcml2YXRlIGZsb2F0IGRpc3RhbmNlID0gMDtcclxuICAgICAgICBwcml2YXRlIGZsb2F0IG5ld0Rpc3RhbmNlID0gMDtcclxuICAgICAgICBwcml2YXRlIGZsb2F0IG9sZERpc3RhbmNlID0gMDsgICAgICAgXHJcblxyXG5cdFx0cHVibGljIGZsb2F0IHNjb3JlID0gMDsgLy89IFNuYWtlLnNjb3JlO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgZGllID0gMDsgLy89IFNuYWtlLmRpZTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdCB3YWxsVXA7IC8vPSAxLXRoaXMucHkvKHRoaXMudGMtMSk7XHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdCB3YWxsRG93bjsgLy89IHRoaXMucHkvKHRoaXMudGMtMSk7XHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdCB3YWxsTGVmdDsgLy89IDEtdGhpcy5weC8odGhpcy50Yy0xKTtcclxuICAgICAgICBwcml2YXRlIGZsb2F0IHdhbGxSaWdodDsgLy8gPSB0aGlzLnB4Lyh0aGlzLnRjLTEpO1xyXG5cclxuICAgICAgICBwcml2YXRlIGZsb2F0IGZvb2RVcDtcclxuICAgICAgICBwcml2YXRlIGZsb2F0IGZvb2REb3duO1xyXG4gICAgICAgIHByaXZhdGUgZmxvYXQgZm9vZExlZnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdCBmb29kUmlnaHQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZmxvYXQgYm9keVVwID0gMjAwO1xyXG5cdFx0cHJpdmF0ZSBmbG9hdCBib2R5RG93biA9IDIwMDtcclxuXHRcdHByaXZhdGUgZmxvYXQgYm9keUxlZnQgPSAyMDA7XHJcblx0XHRwcml2YXRlIGZsb2F0IGJvZHlSaWdodD0gMjAwO1xyXG4gICAgICAgIHByaXZhdGUgZmxvYXQgYWxpdmVUaW1lID0gMjgwMDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBMaXN0PGZsb2F0PiBpbnB1dExpc3QgPSBuZXcgTGlzdDxmbG9hdD4oKTsgLy9pbnB1dCBmb3IgbmV1cmFsIG5ldHdvcmssIHdpbGwgYmUgY29udmVydGVkIHRvIGFycmF5XHJcbiAgICAgICAgcHJpdmF0ZSBUaW1lciB0aW1lcjtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU3RhcnRHYW1lKGludCBhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLyp2YXIgY2FudiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2NcIiArIGEpO1xyXG4gICAgICAgICAgICB2YXIgY3R4ID0gY2Fudi5nZXRDb250ZXh0KFwiMmRcIik7Ki9cclxuICAgICAgICAgICAgUmVzZXQoYSk7IC8qdGhpcy5SZXNldChjYW52LGN0eCxhKTsqL1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBTbmFrZS5rZXlQdXNoKTsgLy8gd2hlbiBrZXlkb3duLCBjYWxsIGZ1bmN0aW9uIGtleVB1c2hcclxuICAgICAgICAgICAgLy9EZWNpc2lvbihhKTtcclxuICAgICAgICAgICAgLy9TbmFrZS5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoU25ha2UuR2FtZSwxMDAsY2FudiwgY3R4LCBhKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZXNldChpbnQgYSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB4ID0gMTA7XHJcbiAgICAgICAgICAgIHB5ID0gMTA7XHJcbiAgICAgICAgICAgIGdzID0gMjA7XHJcbiAgICAgICAgICAgIHRjID0gMjA7XHJcbiAgICAgICAgICAgIGFsaXZlVGltZSA9IDI4MDA7XHJcbiAgICAgICAgICAgIHZ4ID0gMDtcclxuICAgICAgICAgICAgdnkgPSAwOyAvLyBzZXQgaW5pdGlhbCB4LXkgdmVsb2NpdHkgb2YgdGhlIHNuYWtlXHJcbiAgICAgICAgICAgIC8qdGhpcy50cmFpbCA9IFtdOyovXHJcbiAgICAgICAgICAgIHRhaWwgPSAzOyAvL2ludGlhbCBsZW5ndGggb2YgdGhlIHNuYWtlXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkaXN0YW5jZSA9IDA7XHJcbiAgICAgICAgICAgIG5ld0Rpc3RhbmNlID0gMDtcclxuICAgICAgICAgICAgb2xkRGlzdGFuY2UgPSAwO1xyXG4gICAgICAgICAgICBzY29yZSA9IDA7IC8vPSBTbmFrZS5zY29yZTtcclxuICAgICAgICAgICAgZGllID0gMDsvLz0gU25ha2UuZGllO1xyXG4gICAgICAgICAgICAvL3NldCBpbml0aWFsIHgteSBjb3JkaW5hdGUgb2YgdGhlIGFwcGxlXHJcbiAgICAgICAgICAgIC8qdmFyIHJhbmRvbVggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLnRjKTtcclxuICAgICAgICAgICAgICAgIHZhciByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy50Yyk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHRoaXMudHJhaWwubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHJhaWxbaV0ueCA9PSByYW5kb21YICYmIHRoaXMudHJhaWxbaV0ueSA9PSByYW5kb21ZKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMudGMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy50Yyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5heCA9IHJhbmRvbVg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF5ID0gcmFuZG9tWTsqL1xyXG5cclxuICAgICAgICAgICAgLypjdHguZmlsbFN0eWxlID0gXCJibGFja1wiOyAvLyBzZXQgYmFja2dyb3VuZCBjb2xvclxyXG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2Fudi53aWR0aCwgY2Fudi5oZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiZ3JlZW5cIjtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRyYWlsLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QodGhpcy50cmFpbFtpXS54ICogdGhpcy5ncywgdGhpcy50cmFpbFtpXS55ICogdGhpcy5ncywgdGhpcy5ncyAtIDIsIHRoaXMuZ3MgLSAyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmVkXCI7XHJcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLmF4ICogdGhpcy5ncywgdGhpcy5heSAqIHRoaXMuZ3MsIHRoaXMuZ3MgLSAyLCB0aGlzLmdzIC0gMik7XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBHYW1lKGludCBhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYWxpdmVUaW1lIC09IDI1O1xyXG4gICAgICAgICAgICBzY29yZSArPSAwLjI1ZjtcclxuICAgICAgICAgICAgcHggKz0gdng7XHJcbiAgICAgICAgICAgIHB5ICs9IHZ5O1xyXG4gICAgICAgICAgICBpZiAocHggPCAwIHx8IHB4ID4gdGMgLSAxIHx8IHB5IDwgMCB8fCBweSA+IHRjIC0gMSlcclxuICAgICAgICAgICAgeyAvLyBpZiBzbmFrZSBpcyBvdXQgb2YgbGVmdCBib3VuZCBweCA9IHRjLTE7XHJcbiAgICAgICAgICAgICAgICBkaWUgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGltZXIuQ2hhbmdlKFRpbWVvdXQuSW5maW5pdGUsIFRpbWVvdXQuSW5maW5pdGUpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjsgLy8gc2V0IGJhY2tncm91bmQgY29sb3JcclxuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnYud2lkdGgsIGNhbnYuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcImdyZWVuXCI7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50cmFpbC5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMudHJhaWxbaV0ueCAqIHRoaXMuZ3MsIHRoaXMudHJhaWxbaV0ueSAqIHRoaXMuZ3MsIHRoaXMuZ3MgLSAyLCB0aGlzLmdzIC0gMik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFpbC5sZW5ndGggPiAzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYWlsW2ldLnggPT0gdGhpcy5weCAmJiB0aGlzLnRyYWlsW2ldLnkgPT0gdGhpcy5weSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGllID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lci5DaGFuZ2UoLTEsLTEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy50cmFpbC5wdXNoKHt4OnRoaXMucHgsIHk6dGhpcy5weX0pO1xyXG5cdFx0ICAgIHdoaWxlKHRoaXMudHJhaWwubGVuZ3RoPnRoaXMudGFpbCl7XHJcblx0XHRcdCAgICB0aGlzLnRyYWlsLnNoaWZ0KCk7XHJcblx0XHQgICAgfSovXHJcblxyXG4gICAgICAgICAgICBpZiAoYXggPT0gcHggJiYgYXkgPT0gcHkpIC8vIGlmIHBvc2l0aW9uIG9mIHNuYWtlIGlzIGF0IHRoZSBhcHBsZVxyXG4gICAgICAgICAgICB7IFxyXG4gICAgICAgICAgICAgICAgdGFpbCsrOyAvLyBpdCBncm93cyAxIHNpemVcclxuICAgICAgICAgICAgICAgIHNjb3JlICs9IDEwO1xyXG4gICAgICAgICAgICAgICAgLyp0aGlzLmFsaXZlVGltZSArPSAyNTAwOyovIFxyXG4gICAgICAgICAgICAgICAgLy8gdGhlbiBhcHBsZSBwb3NpdGlvbiBhcHBlYXJzIHJhbmRvbWx5IGVsc2V3aGVyZVxyXG4gICAgICAgICAgICAgICAgLyp2YXIgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMudGMpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJhbmRvbVkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLnRjKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgdGhpcy50cmFpbC5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFpbFtpXS54ID09IHJhbmRvbVggJiYgdGhpcy50cmFpbFtpXS55ID09IHJhbmRvbVkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5kb21YID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy50Yyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbVkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLnRjKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF4ID0gcmFuZG9tWDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXkgPSByYW5kb21ZOyovXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8qdGhpcy5kaXN0YW5jZSA9IE1hdGguc3FydChNYXRoLnBvdygodGhpcy5heCAtIHRoaXMucHgpLCAyKSArIE1hdGgucG93KCh0aGlzLmF5IC0gdGhpcy5weSksIDIpKTsqL1xyXG4gICAgICAgICAgICBuZXdEaXN0YW5jZSA9IGRpc3RhbmNlO1xyXG4gICAgICAgICAgICAvL2lmIHRoZSBzbmFrZSBtb3ZlcyBhd2F5IGZyb20gdGhlIGFwcGxlLCBpdCBsb3NlcyBwb2ludFxyXG4gICAgICAgICAgICBpZiAobmV3RGlzdGFuY2UgPiBvbGREaXN0YW5jZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2NvcmUgLT0gMS41ZjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHsgc2NvcmUgKz0gMWY7IH1cclxuICAgICAgICAgICAgb2xkRGlzdGFuY2UgPSBkaXN0YW5jZTtcclxuICAgICAgICAgICAgLyppZiAodGhpcy5hbGl2ZVRpbWUgPD0gMC4wKXsgdGhpcy5kaWUgPSAxOyB0aGlzLnRpbWVyLkNoYW5nZSgtMSwtMSk7IH0qL1xyXG4gICAgICAgICAgICAvKmN0eC5maWxsU3R5bGUgPSBcInJlZFwiO1xyXG4gICAgICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5heCAqIHRoaXMuZ3MsIHRoaXMuYXkgKiB0aGlzLmdzLCB0aGlzLmdzIC0gMiwgdGhpcy5ncyAtIDIpOyovXHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXRbXSBHZXRJbnB1dCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3YWxsVXAgPSAxIC0gcHkvKHRjIC0gMSk7XHJcbiAgICAgICAgICAgIHdhbGxEb3duID0gcHkgLyAodGMgLSAxKTtcclxuICAgICAgICAgICAgd2FsbExlZnQgPSAxIC0gcHggLyAodGMgLSAxKTtcclxuICAgICAgICAgICAgd2FsbFJpZ2h0ID0gcHggLyAodGMgLSAxKTtcclxuXHJcbiAgICAgICAgICAgIC8vQ2FsY3VsYXRlIGRpc3RhbmNlIGZyb20gaGVhZCB0byBmb29kIGluIDQgZGlyZWN0aW9ucyBVcCwgRG93biwgTGVmdCwgUmlnaHRcclxuICAgICAgICAgICAgdmFyIG1pblVwID0gdGMgLSAxO1xyXG4gICAgICAgICAgICB2YXIgbWluRG93biA9IHRjIC0gMTtcclxuICAgICAgICAgICAgdmFyIG1pbkxlZnQgPSB0YyAtIDE7XHJcbiAgICAgICAgICAgIHZhciBtaW5SaWdodCA9IHRjIC0gMTtcclxuXHJcblxyXG4gICAgICAgICAgICAvKmlmICh0aGlzLmF4ID09IHRoaXMucHgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF5ID4gdGhpcy5weSlcclxuICAgICAgICAgICAgICAgIHsgLy8gZm9vZCBhYm92ZSBoZWFkXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMuYXkgLSB0aGlzLnB5KSA+IG1pblVwKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG1pblVwID0gTWF0aC5hYnModGhpcy5heSAtIHRoaXMucHkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5heSA8IHRoaXMucHkpXHJcbiAgICAgICAgICAgICAgICB7IC8vZm9vZCBiZWxvdyBoZWFkXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMuYXkgLSB0aGlzLnB5KSA+IG1pbkRvd24pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbWluRG93biA9IE1hdGguYWJzKHRoaXMuYXkgLSB0aGlzLnB5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5heSA9PSB0aGlzLnB5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5heCA+IHRoaXMucHgpXHJcbiAgICAgICAgICAgICAgICB7IC8vIGZvb2QgbGVmdCBvZiBoZWFkXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMuYXggLSB0aGlzLnB4KSA+IG1pbkxlZnQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbWluTGVmdCA9IE1hdGguYWJzKHRoaXMuYXggLSB0aGlzLnB4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuYXggPCB0aGlzLnB4KVxyXG4gICAgICAgICAgICAgICAgeyAvL2Zvb2QgcmlnaHQgb2YgaGVhZFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLmF4IC0gdGhpcy5weCkgPiBtaW5SaWdodClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBtaW5SaWdodCA9IE1hdGguYWJzKHRoaXMuYXggLSB0aGlzLnB4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSovXHJcblxyXG4gICAgICAgICAgICAvL05vcm1hbGl6ZSBkYXRhOiBzcXVlZXplIGRhdGEgYmV0d2VlbiAwIChmYXIpIGFuZCAxIChjbG9zZSkuIEkgZG9udCBrbm93IHdoeSBteSBsb2dpYyBpcyByZXZlcnNlZCBpbiBkaXJlY3Rpb25cclxuICAgICAgICAgICAgZm9vZFVwID0gMSAtIG1pbkRvd24gLyAodGMgLSAxKTsgLy9JIGRvbnQga25vdyB3aHkgbXkgbG9naWMgbWFrZXMgc2Vuc2UgYnV0IHRoZSByZXN1bHRzIGFyZSByZXZlcnNlZCBpbiBkaXJlY3Rpb25zIHNvIHRoZSBxdWljayBmaXhlcyBhcmUgbGlrZSB0aGVzZS5cclxuICAgICAgICAgICAgZm9vZERvd24gPSAxIC0gbWluVXAgLyAodGMgLSAxKTtcclxuICAgICAgICAgICAgZm9vZExlZnQgPSAxIC0gbWluUmlnaHQgLyAodGMgLSAxKTtcclxuICAgICAgICAgICAgZm9vZFJpZ2h0ID0gMSAtIG1pbkxlZnQgLyAodGMgLSAxKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL0NhbGN1bGF0ZSBkaXN0YW5jZSBmcm9tIGhlYWQgdG8gYm9keSBpbiA0IGRpcmVjdGlvbnNcclxuICAgICAgICAgICAgLy9SZXNldCB0aGUgdmFyc1xyXG4gICAgICAgICAgICBtaW5VcCA9IHRjIC0gMTtcclxuICAgICAgICAgICAgbWluRG93biA9IHRjIC0gMTtcclxuICAgICAgICAgICAgbWluTGVmdCA9IHRjIC0gMTtcclxuICAgICAgICAgICAgbWluUmlnaHQgPSB0YyAtIDE7XHJcblxyXG4gICAgICAgICAgICAvKmZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50cmFpbC5sZW5ndGggLSAxOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFpbFtpXS54ID09IHRoaXMucHgpXHJcbiAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYWlsW2ldLnkgPiB0aGlzLnB5KVxyXG4gICAgICAgICAgICAgICAgICAgIHsvL2JvZHkgYWJvdmUgaGVhZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy50cmFpbFtpXS55IC0gdGhpcy5weSkgPiBtaW5VcClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5VcCA9IE1hdGguYWJzKHRoaXMudHJhaWxbaV0ueSAtIHRoaXMucHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy50cmFpbFtpXS55IDwgdGhpcy5weSlcclxuICAgICAgICAgICAgICAgICAgICB7Ly9ib2R5IGJlbG93IGhlYWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMudHJhaWxbaV0ueSAtIHRoaXMucHkpID4gbWluRG93bilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5Eb3duID0gTWF0aC5hYnModGhpcy50cmFpbFtpXS55IC0gdGhpcy5weSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYWlsW2ldLnkgPT0gdGhpcy5weSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFpbFtpXS54ID4gdGhpcy5weClcclxuICAgICAgICAgICAgICAgICAgICB7Ly9ib2R5IGxlZnQgb2YgaGVhZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy50cmFpbFtpXS54IC0gdGhpcy5weCkgPiBtaW5MZWZ0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbkxlZnQgPSBNYXRoLmFicyh0aGlzLnRyYWlsW2ldLnggLSB0aGlzLnB4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy50cmFpbFtpXS54IDwgdGhpcy5weClcclxuICAgICAgICAgICAgICAgICAgICB7Ly9ib2R5IHJpZ2h0IG9mIGhlYWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMudHJhaWxbaV0ueCAtIHRoaXMucHgpID4gbWluUmlnaHQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluUmlnaHQgPSBNYXRoLmFicyh0aGlzLnRyYWlsW2ldLnggLSB0aGlzLnB4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9Ki9cclxuXHJcblxyXG4gICAgICAgICAgICAvL05vcm1hbGl6ZSBkYXRhOiBzcXVlZXplIGRhdGEgYmV0d2VlbiAwIGFuZCAxXHJcbiAgICAgICAgICAgIGJvZHlVcCA9IDEgLSBtaW5Eb3duIC8gKHRjIC0gMSk7XHJcbiAgICAgICAgICAgIGJvZHlEb3duID0gMSAtIG1pblVwIC8gKHRjIC0gMSk7XHJcbiAgICAgICAgICAgIGJvZHlMZWZ0ID0gMSAtIG1pblJpZ2h0IC8gKHRjIC0gMSk7XHJcbiAgICAgICAgICAgIGJvZHlSaWdodCA9IDEgLSBtaW5MZWZ0IC8gKHRjIC0gMSk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpbnB1dExpc3QuQ2xlYXIoKTtcclxuXHJcbiAgICAgICAgICAgIGlucHV0TGlzdC5BZGQod2FsbFVwKTtcclxuICAgICAgICAgICAgaW5wdXRMaXN0LkFkZCh3YWxsRG93bik7XHJcbiAgICAgICAgICAgIGlucHV0TGlzdC5BZGQod2FsbExlZnQpO1xyXG4gICAgICAgICAgICBpbnB1dExpc3QuQWRkKHdhbGxSaWdodCk7XHJcbiAgICAgICAgICAgIGlucHV0TGlzdC5BZGQoYm9keVVwKTtcclxuICAgICAgICAgICAgaW5wdXRMaXN0LkFkZChib2R5RG93bik7XHJcbiAgICAgICAgICAgIGlucHV0TGlzdC5BZGQoYm9keUxlZnQpO1xyXG4gICAgICAgICAgICBpbnB1dExpc3QuQWRkKGJvZHlSaWdodCk7XHJcbiAgICAgICAgICAgIGlucHV0TGlzdC5BZGQoZm9vZFVwKTtcclxuICAgICAgICAgICAgaW5wdXRMaXN0LkFkZChmb29kRG93bik7XHJcbiAgICAgICAgICAgIGlucHV0TGlzdC5BZGQoZm9vZExlZnQpO1xyXG4gICAgICAgICAgICBpbnB1dExpc3QuQWRkKGZvb2RSaWdodCk7XHJcbiAgICAgICAgICAgIGZsb2F0W10gaW5wdXRzID0gaW5wdXRMaXN0LlRvQXJyYXkoKTsgLy8xMiBpbnB1dCBuZXVyb25zXHJcbiAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gaW5wdXRzO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEZWNpc2lvbihOZXVyYWxOZXR3b3JrIG1lbWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0W10gb3V0cHV0cyA9IG1lbWJlci5GZWVkRm93YXJkKEdldElucHV0KCkpOyAvL2dldCBvdXRwdXQgbmV1cm9ucyBmcm9tIHRoZSBuZXR3b3JrXHJcbiAgICAgICAgICAgIGZsb2F0IG1heFZhbHVlID0gb3V0cHV0cy5NYXgoKTtcclxuICAgICAgICAgICAgaW50IG1heEluZGV4ID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0xpc3Q8ZmxvYXQ+KG91dHB1dHMpLkluZGV4T2YobWF4VmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChtYXhJbmRleClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIC8vVHVybiBsZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZ4ID09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgeyAvLyBpZiBzbmFrZSBpcyBoZWFkaW5nIHJpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgfSAvLyBkbyBub3RoaW5nLiBUaGlzIHByZXZlbnRzIHRoZSBzbmFrZSBtb3ZlcyBiYWNrd2FyZC4gRG8gdGhlIHNhbWUgZm9yIG90aGVyIGtleXMuXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdnggPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdnkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAvL1R1cm4gcmlnaHRcclxuICAgICAgICAgICAgICAgICAgICBpZiAodnggPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2eCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZ5ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UdXJuIGRvd25cclxuICAgICAgICAgICAgICAgICAgICBpZiAodnkgPT0gMSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZ4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdnkgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UdXJuIHVwXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZ5ID09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdnggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2eSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBMb29wR2FtZShpbnQgYSwgTmV1cmFsTmV0d29yayBtZW1iZXIsIGZsb2F0IG1zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0VGltZVNwYW4gPSBUaW1lU3Bhbi5aZXJvO1xyXG4gICAgICAgICAgICB2YXIgcGVyaW9kVGltZVNwYW4gPSBUaW1lU3Bhbi5Gcm9tTWlsbGlzZWNvbmRzKG1zKTtcclxuICAgICAgICAgICAgLyp2YXIgY2FudiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2NcIiArIGEpO1xyXG4gICAgICAgICAgICB2YXIgY3R4ID0gY2Fudi5nZXRDb250ZXh0KFwiMmRcIik7Ki9cclxuXHJcbiAgICAgICAgICAgIHRpbWVyID0gbmV3IFRpbWVyKChlKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHYW1lKGEpOy8qdGhpcy5HYW1lKGNhbnYsY3R4LGEpKi9cclxuICAgICAgICAgICAgICAgIERlY2lzaW9uKG1lbWJlcik7XHJcbiAgICAgICAgICAgIH0sIG51bGwsIHN0YXJ0VGltZVNwYW4sIHBlcmlvZFRpbWVTcGFuKTtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIiwidXNpbmcgQnJpZGdlO1xyXG51c2luZyBOZXd0b25zb2Z0Lkpzb247XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nO1xyXG51c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgRU5OX1NuYWtlX0dhbWVcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFN0YXJ0R2FtZVxyXG4gICAge1xyXG4gICAgICAgICAgICAvLyBXcml0ZSBhIG1lc3NhZ2UgdG8gdGhlIENvbnNvbGVcclxuICAgICAgICAgICAgLy8gQ29uc29sZS5Xcml0ZUxpbmUoXCJXZWxjb21lIHRvIEJyaWRnZS5ORVRcIik7XHJcblxyXG4gICAgICAgICAgICAvLyBBZnRlciBidWlsZGluZyAoQ3RybCArIFNoaWZ0ICsgQikgdGhpcyBwcm9qZWN0LCBcclxuICAgICAgICAgICAgLy8gYnJvd3NlIHRvIHRoZSAvYmluL0RlYnVnIG9yIC9iaW4vUmVsZWFzZSBmb2xkZXIuXHJcblxyXG4gICAgICAgICAgICAvLyBBIG5ldyBicmlkZ2UvIGZvbGRlciBoYXMgYmVlbiBjcmVhdGVkIGFuZFxyXG4gICAgICAgICAgICAvLyBjb250YWlucyB5b3VyIHByb2plY3RzIEphdmFTY3JpcHQgZmlsZXMuIFxyXG5cclxuICAgICAgICAgICAgLy8gT3BlbiB0aGUgYnJpZGdlL2luZGV4Lmh0bWwgZmlsZSBpbiBhIGJyb3dzZXIgYnlcclxuICAgICAgICAgICAgLy8gUmlnaHQtQ2xpY2sgPiBPcGVuIFdpdGguLi4sIHRoZW4gY2hvb3NlIGFcclxuICAgICAgICAgICAgLy8gd2ViIGJyb3dzZXIgZnJvbSB0aGUgbGlzdFxyXG5cclxuICAgICAgICAgICAgLy8gVGhpcyBhcHBsaWNhdGlvbiB3aWxsIHRoZW4gcnVuIGluIHRoZSBicm93c2VyLlxyXG5cclxuICAgICAgICBpbnQgcG9wdWxhdGlvblNpemUgPSAyMjA7XHJcbiAgICAgICAgZmxvYXQgbXV0YXRpb25SYXRlID0gMC4wNWY7XHJcbiAgICAgICAgaW50IGVsaXRpc20gPSAxMDtcclxuICAgICAgICBwcml2YXRlIHN0cmluZyBmaWxlUGF0aCA9IEBcIkQ6XFxTRUxGIExFQVJOSU5HXFxFTk4gU25ha2UgR2FtZVxcXCI7XHJcblxyXG4gICAgICAgIHByaXZhdGUgR0EgZ2E7XHJcbiAgICAgICAgcHVibGljIE5ldXJhbE5ldHdvcmsgbm47XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgU3RhcnRHYW1lIFR1O1xyXG4gICAgICAgIHByaXZhdGUgVGltZXIgdGltZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBSYW5kb20gcmFuZG9tO1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PFNuYWtlPiBTbmFrZUxpc3Q7XHJcbiAgICAgICAgaW50IGRlYXRoQ291bnQgPSAwO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUdSA9IG5ldyBTdGFydEdhbWUoKTtcclxuICAgICAgICAgICAgVHUuU3RhcnQoKTtcclxuICAgICAgICAgICAgLyp2YXIgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJCVVRUT05cIik7XHJcbiAgICAgICAgICAgIGlmIChidXR0b24uYWRkRXZlbnRMaXN0ZW5lcilcclxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIEVOTl9TbmFrZV9HYW1lLlN0YXJ0R2FtZS5UdSA9IG5ldyBFTk5fU25ha2VfR2FtZS5TdGFydEdhbWUoKTtcbiAgICAgICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpeyBFTk5fU25ha2VfR2FtZS5TdGFydEdhbWUuVHUuU3RhcnQoKTsgfSk7XG4gICAgICAgICAgICB9Ki9cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTdGFydCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByYW5kb20gPSBuZXcgUmFuZG9tKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBTbmFrZUxpc3QgPSBuZXcgTGlzdDxTbmFrZT4ocG9wdWxhdGlvblNpemUpO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGdhID0gbmV3IEdBKHBvcHVsYXRpb25TaXplLCByYW5kb20sIGVsaXRpc20sIG11dGF0aW9uUmF0ZSwgRml0bmVzc0Z1bmN0aW9uLCAwLCA1LCBmaWxlUGF0aCk7IC8vaW5pdGlhbGl6ZSAxc3QgZ2VuZXJhdGlvbiBvZiBuZXVyYWwgbmV0d29ya3NcclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgZ2EuUG9wdWxhdGlvbi5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTbmFrZUxpc3QuQWRkKG5ldyBTbmFrZSgpKTtcclxuICAgICAgICAgICAgICAgIFNuYWtlTGlzdFtpXS5TdGFydEdhbWUoaSk7XHJcbiAgICAgICAgICAgICAgICBTbmFrZUxpc3RbaV0uTG9vcEdhbWUoaSwgZ2EuUG9wdWxhdGlvbltpXSwyNSk7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLypkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkdlbmVyYXRpb25cIikuaW5uZXJIVE1MID0gdGhpcy5nYS5HZW5lcmF0aW9uO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaXRuZXNzXCIpLmlubmVySFRNTCA9IHRoaXMuZ2EuQmVzdEZpdG5lc3M7Ki9cclxuXHJcbiAgICAgICAgICAgIHZhciBzdGFydFRpbWVTcGFuID0gVGltZVNwYW4uWmVybztcclxuICAgICAgICAgICAgdmFyIHBlcmlvZFRpbWVTcGFuID0gVGltZVNwYW4uRnJvbU1pbGxpc2Vjb25kcygyMCk7XHJcblxyXG4gICAgICAgICAgICB0aW1lciA9IG5ldyBUaW1lcigoZSkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVhdGhDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHBvcHVsYXRpb25TaXplOyBpKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRml0bmVzc0Z1bmN0aW9uKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlYXRoQ291bnQgKz0gU25ha2VMaXN0W2ldLmRpZTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVhdGhDb3VudCA9PSBwb3B1bGF0aW9uU2l6ZSkgeyB0aW1lci5DaGFuZ2UoVGltZW91dC5JbmZpbml0ZSwgVGltZW91dC5JbmZpbml0ZSk7IGRlYXRoQ291bnQgPSAwOyBVcGRhdGUoKTsgfTtcclxuICAgICAgICAgICAgfSwgbnVsbCwgc3RhcnRUaW1lU3BhbiwgcGVyaW9kVGltZVNwYW4pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdhLk5ld0dlbmVyYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgZ2EuUG9wdWxhdGlvbi5Db3VudDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTbmFrZUxpc3RbaV0uU3RhcnRHYW1lKGkpOyAvL2luaXRpYWxpemUgZ2FtZSBlbnZpcm9ubWVudFxyXG4gICAgICAgICAgICAgICAgU25ha2VMaXN0W2ldLkxvb3BHYW1lKGksIGdhLlBvcHVsYXRpb25baV0sMjUpOyAvL3J1biB0aGUgZ2FtZSB1c2luZyBublxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJHZW5lcmF0aW9uXCIpLmlubmVySFRNTCA9IHRoaXMuZ2EuR2VuZXJhdGlvbjtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZml0bmVzc1wiKS5pbm5lckhUTUwgPSB0aGlzLmdhLkJlc3RGaXRuZXNzOyovXHJcblxyXG4gICAgICAgICAgICB2YXIgc3RhcnRUaW1lU3BhbiA9IFRpbWVTcGFuLlplcm87XHJcbiAgICAgICAgICAgIHZhciBwZXJpb2RUaW1lU3BhbiA9IFRpbWVTcGFuLkZyb21NaWxsaXNlY29uZHMoMjApO1xyXG4gICAgICAgICAgICB0aW1lciA9IG5ldyBUaW1lcigoZSkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVhdGhDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHBvcHVsYXRpb25TaXplOyBpKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRml0bmVzc0Z1bmN0aW9uKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlYXRoQ291bnQgKz0gU25ha2VMaXN0W2ldLmRpZTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVhdGhDb3VudCA9PSBwb3B1bGF0aW9uU2l6ZSkgeyB0aW1lci5DaGFuZ2UoVGltZW91dC5JbmZpbml0ZSwgVGltZW91dC5JbmZpbml0ZSk7IGRlYXRoQ291bnQgPSAwOyBVcGRhdGUoKTsgfTtcclxuICAgICAgICAgICAgfSwgbnVsbCwgc3RhcnRUaW1lU3BhbiwgcGVyaW9kVGltZVNwYW4pO1xyXG5cclxuICAgICAgICAgICAgLy9VcGRhdGVUZXh0KGdhLkJlc3RHZW5lcywgZ2EuQmVzdEZpdG5lc3MsIGdhLkdlbmVyYXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IEZpdG5lc3NGdW5jdGlvbihpbnQgaW5kZXgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAgcmV0dXJuIFNuYWtlTGlzdFtpbmRleF0uc2NvcmU7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFVwZGF0ZVRleHQoZmxvYXRbXVtdW10gYmVzdEdlbmVzLCBmbG9hdCBiZXN0Rml0bmVzcywgaW50IGdlbmVyYXRpb24pXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXQp9Cg==
