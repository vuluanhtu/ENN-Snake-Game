/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2019
 * @compiler Bridge.NET 17.9.0
 */
Bridge.assembly("Snake Solo Run", function ($asm, globals) {
    "use strict";

    Bridge.define("Snake_Solo_Run.App", {
        main: function Main () {
            var button = document.getElementById("BUTTON");
            if (button.addEventListener)
            {
               Snake_Solo_Run.App.Tu = new Snake_Solo_Run.App();
               button.addEventListener('click', function(){ Snake_Solo_Run.App.Tu.Start(); });
            }

        },
        statics: {
            fields: {
                Tu: null
            }
        },
        fields: {
            nn: null,
            nnLayer: null,
            random: null
        },
        ctors: {
            init: function () {
                this.nnLayer = System.Array.init([12, 10, 4], System.Int32);
            }
        },
        methods: {
            Start: function () {
                var $t, $t1, $t2, $t3, $t4, $t5, $t6, $t7, $t8, $t9, $t10, $t11, $t12, $t13, $t14, $t15, $t16, $t17, $t18, $t19, $t20, $t21, $t22, $t23, $t24, $t25, $t26, $t27;
                this.random = new System.Random.ctor();
                this.nn = new Snake_Solo_Run.NeuralNetwork(this.nnLayer, this.random);
                ($t = ($t1 = this.nn.weights)[System.Array.index(0, $t1)])[System.Array.index(0, $t)] = System.Array.init([-40.11956, -6.21460247, 16.39396, 6.71747065, -40.6645851, -48.5683556, 8.986864, 13.8576565, -34.9175339, 36.1575432, 26.1756725, -39.3880463], System.Single);
                ($t2 = ($t3 = this.nn.weights)[System.Array.index(0, $t3)])[System.Array.index(1, $t2)] = System.Array.init([-24.77512, -38.88707, -42.9242821, -24.423542, 29.75724, 37.9336777, 39.8932266, 21.0792065, -38.4815941, 3.68685532, 14.1846361, -48.4997826], System.Single);
                ($t4 = ($t5 = this.nn.weights)[System.Array.index(0, $t5)])[System.Array.index(2, $t4)] = System.Array.init([17.3177872, -5.59048176, -20.2526836, -49.7726631, -24.2386513, 5.18635845, 19.9443188, -46.0959663, -37.736805, -41.0577049, 3.5769608, 5.32042646], System.Single);
                ($t6 = ($t7 = this.nn.weights)[System.Array.index(0, $t7)])[System.Array.index(3, $t6)] = System.Array.init([-3.29725528, -34.1547546, -39.5642662, 37.4268227, 42.2917442, -19.41634, -29.6030064, 29.3311157, 12.8381758, 44.611145, 44.60943, -14.53122], System.Single);
                ($t8 = ($t9 = this.nn.weights)[System.Array.index(0, $t9)])[System.Array.index(4, $t8)] = System.Array.init([-20.9017334, 3.96180534, 48.4256134, 43.73882, 0.575906038, -7.18062973, -29.3283539, 48.169754, -49.55966, -10.7277145, -47.82726, -49.30956], System.Single);
                ($t10 = ($t11 = this.nn.weights)[System.Array.index(0, $t11)])[System.Array.index(5, $t10)] = System.Array.init([-46.39477, -37.3654, -9.383331, 48.43893, 7.34326744, -36.941906, 11.813571, -31.0524216, -29.9261818, -7.794671, 14.5834408, -34.790554], System.Single);
                ($t12 = ($t13 = this.nn.weights)[System.Array.index(0, $t13)])[System.Array.index(6, $t12)] = System.Array.init([-43.1958046, 34.31092, -49.3012123, -36.89651, 17.6786633, -15.7566147, 40.95735, 7.2689333, 11.5612707, 4.65640259, 13.448863, 42.3431854], System.Single);
                ($t14 = ($t15 = this.nn.weights)[System.Array.index(0, $t15)])[System.Array.index(7, $t14)] = System.Array.init([-24.2172375, 31.89645, 10.6519461, 32.284626, -49.1259422, 45.12174, -17.7879333, -40.3933868, -14.4360857, 39.9200935, -7.36663866, 19.7349987], System.Single);
                ($t16 = ($t17 = this.nn.weights)[System.Array.index(0, $t17)])[System.Array.index(8, $t16)] = System.Array.init([-0.3361223, -31.29948, -49.63892, -44.5871277, 2.76439118, -47.0621643, -32.83908, 9.803472, -25.66569, 17.05376, -46.3875, -15.88512], System.Single);
                ($t18 = ($t19 = this.nn.weights)[System.Array.index(0, $t19)])[System.Array.index(9, $t18)] = System.Array.init([44.8755722, 26.0148659, 40.6936569, -31.85096, 22.2143059, -27.0811882, -4.72573376, 3.97683764, -11.3570929, -14.1841412, -33.2730026, 46.81109], System.Single);
                ($t20 = ($t21 = this.nn.weights)[System.Array.index(1, $t21)])[System.Array.index(0, $t20)] = System.Array.init([0.532441854, -7.088387, -12.2001457, 45.56793, 6.48384762, -7.368325, -43.4536476, 17.0226574, -47.239727, -18.30877], System.Single);
                ($t22 = ($t23 = this.nn.weights)[System.Array.index(1, $t23)])[System.Array.index(1, $t22)] = System.Array.init([-38.8756676, -31.7138119, -13.0510387, -33.793808, -19.2862835, -48.1701622, 30.7102413, 20.8063488, -4.77398729, 37.53699], System.Single);
                ($t24 = ($t25 = this.nn.weights)[System.Array.index(1, $t25)])[System.Array.index(2, $t24)] = System.Array.init([-9.899406, -19.1831684, 9.833529, -47.3156242, -2.14388871, 44.5336838, -24.3126049, 33.0754, -11.0230818, 2.732744], System.Single);
                ($t26 = ($t27 = this.nn.weights)[System.Array.index(1, $t27)])[System.Array.index(3, $t26)] = System.Array.init([-30.6929932, -14.5957766, -18.5659428, -48.58302, 25.7987785, -38.9578476, -44.30786, -42.96618, 3.40185, 31.3933487], System.Single);


                var snake = new Snake_Solo_Run.Snake();
                snake.StartGame(0);
                snake.LoopGame(0, this.nn, 20);

            }
        }
    });

    Bridge.define("Snake_Solo_Run.NeuralNetwork", {
        fields: {
            Layers: null,
            neurons: null,
            weights: null,
            random: null,
            Fitness: 0
        },
        ctors: {
            ctor: function (layers, random) {
                this.$initialize();

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
            }
        }
    });

    Bridge.define("Snake_Solo_Run.Snake", {
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
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJTbmFrZSBTb2xvIFJ1bi5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIiwiTmV1cmFsTmV0d29yay5jcyIsIlNuYWtlLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O1lBa0JZQSx3QkFBS0EsSUFBSUE7WUFDVEE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQkFQd0JBOzs7Ozs7Z0JBbUJ4QkEsY0FBU0EsSUFBSUE7Z0JBQ2JBLFVBQUtBLElBQUlBLDZCQUFjQSxjQUFTQTtnQkFDaENBLHdGQUFtQkEsbUJBQWNBLFdBQXNCQSxtQ0FBNkRBLGFBQXFCQSxtQ0FBOERBLHFDQUE2REE7Z0JBQ3BRQSwwRkFBbUJBLG1CQUFjQSxXQUFzQkEsV0FBcUJBLGFBQXFCQSwwREFBd0dBLHFDQUErREE7Z0JBQ3hRQSwwRkFBbUJBLCtCQUFtQ0EsYUFBcUJBLGFBQXNCQSxhQUFxQkEscUNBQWdFQSxhQUFxQkEsWUFBc0JBO2dCQUNqT0EsMEZBQW1CQSxtQkFBY0EsYUFBc0JBLGFBQXFCQSxxQ0FBK0RBLFdBQXNCQSwwREFBeUdBO2dCQUMxUUEsMEZBQW1CQSxtQkFBY0EsNERBQXlHQSxhQUFxQkEsd0JBQTBDQSxXQUFxQkEsYUFBc0JBLFdBQXFCQTtnQkFDelFBLDhGQUFtQkEsbUJBQWNBLFdBQXNCQSxVQUFxQkEsaUNBQTZEQSx1QkFBMENBLGFBQXNCQSxhQUFzQkEsdUJBQTBDQTtnQkFDelFBLDhGQUFtQkEsbUJBQWNBLHVCQUF5Q0EsYUFBc0JBLHVCQUF5Q0E7Z0JBQ3pJQSw4RkFBbUJBLG1CQUFjQSw4Q0FBb0ZBLHVCQUF5Q0EsYUFBcUJBLGFBQXFCQSx5QkFBMkNBO2dCQUNuUEEsOEZBQW1CQSxtQkFBY0EsWUFBc0JBLFdBQXNCQSxXQUFxQkEseUJBQTJDQSxhQUFxQkEscUJBQXlDQSxxQkFBMkNBLFVBQW9CQTtnQkFDMVFBLDhGQUFtQkEsdURBQTJFQSx1QkFBd0NBLGFBQXNCQSx5QkFB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QTs0QkFDTEE7O3dCQUVKQTtvQkFDSkE7d0JBRUlBLElBQUlBLFlBQU1BOzs0QkFLTkE7NEJBQ0FBOzt3QkFFSkE7b0JBQ0pBO3dCQUVJQSxJQUFJQTs7NEJBS0FBOzRCQUNBQSxVQUFLQTs7d0JBRVRBO29CQUNKQTt3QkFFSUEsSUFBSUEsWUFBTUE7OzRCQUtOQTs0QkFDQUE7O3dCQUVKQTs7O2dDQUlTQSxHQUFPQSxRQUFzQkE7Z0JBRTlDQSxvQkFBb0JBO2dCQUNwQkEscUJBQXFCQSxpQ0FBMEJBOzs7O2dCQUkvQ0EsYUFBUUEsSUFBSUEsOEJBQU1BLCtCQUFDQTtvQkFFZkEsVUFBS0E7b0JBQ0xBLGNBQVNBO29CQUNWQSxNQUFNQSxlQUFlQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nO1xyXG5cclxubmFtZXNwYWNlIFNuYWtlX1NvbG9fUnVuXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHsgXHJcbiAgICAgICAgICAgIHB1YmxpYyBOZXVyYWxOZXR3b3JrIG5uO1xyXG4gICAgICAgICAgICBwcml2YXRlIHN0YXRpYyBBcHAgVHU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwcml2YXRlIGludFtdIG5uTGF5ZXIgPSBuZXcgaW50WzNdIHsgMTIsIDEwLCA0IH07XHJcbiAgICAgICAgICAgIHByaXZhdGUgUmFuZG9tIHJhbmRvbTtcclxuICAgICAgICAgICBcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVHUgPSBuZXcgQXBwKCk7XHJcbiAgICAgICAgICAgIFR1LlN0YXJ0KCk7XHJcbiAgICAgICAgICAgIC8qdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQlVUVE9OXCIpO1xyXG4gICAgICAgICAgICBpZiAoYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIpXHJcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBTbmFrZV9Tb2xvX1J1bi5BcHAuVHUgPSBuZXcgU25ha2VfU29sb19SdW4uQXBwKCk7XG4gICAgICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXsgU25ha2VfU29sb19SdW4uQXBwLlR1LlN0YXJ0KCk7IH0pO1xuICAgICAgICAgICAgfSovXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU3RhcnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmFuZG9tID0gbmV3IFJhbmRvbSgpO1xyXG4gICAgICAgICAgICBubiA9IG5ldyBOZXVyYWxOZXR3b3JrKG5uTGF5ZXIsIHJhbmRvbSk7XHJcbiAgICAgICAgICAgIG5uLndlaWdodHNbMF1bMF0gPSBuZXcgZmxvYXRbXSB7IC00MC4xMTk1NjA5ODk2MDY5MjRmLCAtNi4yMTQ2MDI0NTc0NTkzNjRmLCAxNi4zOTM5NjAwMTg4MjU3MWYsIDYuNzE3NDcwNjQwNjUwNzAzZiwgLTQwLjY2NDU4NDI3ODQzODUxZiwgLTQ4LjU2ODM1Mzk4NzU2MzU3ZiwgOC45ODY4NjQyNjY0NDUzMjNmLCAxMy44NTc2NTY1NjA3NzE5MzZmLCAtMzQuOTE3NTM0OTczODk5NjJmLCAzNi4xNTc1NDQ2OTU4NDU1OWYsIDI2LjE3NTY3MjA4NDE3NDg5ZiwgLTM5LjM4ODA0NzA2MDY0NDI3NmZ9O1xyXG4gICAgICAgICAgICBubi53ZWlnaHRzWzBdWzFdID0gbmV3IGZsb2F0W10geyAtMjQuNzc1MTE4OTc0Mzk4NDEzZiwgLTM4Ljg4NzA3MDA2NzYzOTk2ZiwgLTQyLjkyNDI4MTM0NjExMDc2ZiwgLTI0LjQyMzU0MTUzNTgyMDU5N2YsIDI5Ljc1NzI0MDc3NzcyMjIwM2YsIDM3LjkzMzY3NjA3ODg4NDcxNmYsIDM5Ljg5MzIyNjY0Njc2ODVmLCAyMS4wNzkyMDYwODA2Nzg0NzVmLCAtMzguNDgxNTkyNDc0NzI5NTdmLCAzLjY4Njg1NTQzMjQzMTYxMzZmLCAxNC4xODQ2MzYwNDcxOTU5MzdmLCAtNDguNDk5NzgyMTk2NDc4ODJmIH07XHJcbiAgICAgICAgICAgIG5uLndlaWdodHNbMF1bMl0gPSBuZXcgZmxvYXRbXSB7IDE3LjMxNzc4ODAwODI4MjgwNGYsIC01LjU5MDQ4MTgwMjYzMDQ2NGYsIC0yMC4yNTI2ODQzMDM2NzcwMjVmLCAtNDkuNzcyNjYyMjk2Nzg1MzVmLCAtMjQuMjM4NjUyMTE4NTkyODI4ZiwgNS4xODYzNTgzMDYxNzgwNjQ1ZiwgMTkuOTQ0MzE4NTU2MjAwODU1ZiwgLTQ2LjA5NTk2NjAzMzY4MjIxZiwgLTM3LjczNjgwNjQ1NDAxNDQwNmYsIC00MS4wNTc3MDYzNDA3MDg2MzRmLCAzLjU3Njk2MDgxMjEyNTgwNDVmLCA1LjMyMDQyNjI0MjEwOTU5MDVmIH07XHJcbiAgICAgICAgICAgIG5uLndlaWdodHNbMF1bM10gPSBuZXcgZmxvYXRbXSB7IC0zLjI5NzI1NTMwNjE3NzQyNjNmLCAtMzQuMTU0NzU0MjY0MzUyMjZmLCAtMzkuNTY0MjY2MDk3NTI4OTg2ZiwgMzcuNDI2ODIyMjA3NjAxMTlmLCA0Mi4yOTE3NDM2NzcyNDUzMzZmLCAtMTkuNDE2MzM5NTQxNTEzNjMzZiwgLTI5LjYwMzAwNjMwODcxMzQ2NGYsIDI5LjMzMTExNTUzMDQ5MjMyNmYsIDEyLjgzODE3NTg3NTUyNTA2N2YsIDQ0LjYxMTE0NDgwODQwNTYxZiwgNDQuNjA5NDI3MTIzNjE0MzI0ZiwgLTE0LjUzMTIyMDQ3OTE4NDM5OGYgfTtcclxuICAgICAgICAgICAgbm4ud2VpZ2h0c1swXVs0XSA9IG5ldyBmbG9hdFtdIHsgLTIwLjkwMTczMzA2NDUxMjU5NGYsIDMuOTYxODA1MzI1OTE1MDE2ZiwgNDguNDI1NjE0NjQ2ODM0MTM0ZiwgNDMuNzM4ODE5NTYyNzA4NDE0ZiwgMC41NzU5MDYwNjE4MzU1MzkyZiwgLTcuMTgwNjI5ODgzNTExMjg3ZiwgLTI5LjMyODM1NDA2NTkyNTA0OGYsIDQ4LjE2OTc1MjgxNDg4NjA1ZiwgLTQ5LjU1OTY2MzA5NjIzNzc3ZiwgLTEwLjcyNzcxNDgyMjAzNTE1M2YsIC00Ny44MjcyNTgyODU5ODU5MWYsIC00OS4zMDk1NTkxMTk1NDM3ODVmIH07XHJcbiAgICAgICAgICAgIG5uLndlaWdodHNbMF1bNV0gPSBuZXcgZmxvYXRbXSB7IC00Ni4zOTQ3Njk3MDYwMTU4MzZmLCAtMzcuMzY1Mzk2NTQ3NzY3MDVmLCAtOS4zODMzMzA4NDc3ODA4NGYsIDQ4LjQzODkzMDY5NzAxMjE5NmYsIDcuMzQzMjY3NDg5ODUwMTc3ZiwgLTM2Ljk0MTkwNDY2MTY4NDI1ZiwgMTEuODEzNTcxMDUzNDcwMjg0ZiwgLTMxLjA1MjQyMDkzMTQyNzAwNWYsIC0yOS45MjYxODE5NDc3NzgwNjJmLCAtNy43OTQ2NzA4MzQxMTA0MjdmLCAxNC41ODM0NDA3NjA0MjIyMzVmLCAtMzQuNzkwNTU0MTY5OTMzNTdmIH07XHJcbiAgICAgICAgICAgIG5uLndlaWdodHNbMF1bNl0gPSBuZXcgZmxvYXRbXSB7IC00My4xOTU4MDYyMDc2OTIxNmYsIDM0LjMxMDkxOTc4NDE1NDI0ZiwgLTQ5LjMwMTIxMzI1ODU1MTk5NmYsIC0zNi44OTY1MTE4NTk2Nzc5N2YsIDE3LjY3ODY2MzE2NjA5MDIzZiwgLTE1Ljc1NjYxNDc2OTY5NTYxNmYsIDQwLjk1NzM1MDY5ODc0NTUxNWYsIDcuMjY4OTMzMzczMTYyOTU5ZiwgMTEuNTYxMjcwNzg1MzEzNjk1ZiwgNC42NTY0MDI2MDU4OTE0MTVmLCAxMy40NDg4NjMzMTk3OTU5NzZmLCA0Mi4zNDMxODU2OTg3NzMzNGYgfTtcclxuICAgICAgICAgICAgbm4ud2VpZ2h0c1swXVs3XSA9IG5ldyBmbG9hdFtdIHsgLTI0LjIxNzIzNzI4NzMwMjE0N2YsIDMxLjg5NjQ0OTQzMDc5NzQ2ZiwgMTAuNjUxOTQ1Njc2OTU4MTY0ZiwgMzIuMjg0NjI2NjgyNDIxNDc1ZiwgLTQ5LjEyNTk0MTA5NzMyOTM0NmYsIDQ1LjEyMTczODgyNDU4NDRmLCAtMTcuNzg3OTMzMTAxNzc4ODJmLCAtNDAuMzkzMzg4MzU5OTkwNjJmLCAtMTQuNDM2MDg1NDU5MDQ3OTczZiwgMzkuOTIwMDkxOTUwMjk3NDA1ZiwgLTcuMzY2NjM4NDI0NTExMzY1ZiwgMTkuNzM0OTk5NDMwMjQyNDY4ZiB9O1xyXG4gICAgICAgICAgICBubi53ZWlnaHRzWzBdWzhdID0gbmV3IGZsb2F0W10geyAtMC4zMzYxMjIzMDM0MjYzMjE5ZiwgLTMxLjI5OTQ4MDYwMDg4NzY2NmYsIC00OS42Mzg5MjA5NzU2ODA4OWYsIC00NC41ODcxMjkyNTg4MjQxMDZmLCAyLjc2NDM5MTEzMjA1NTAzMTZmLCAtNDcuMDYyMTY0MjE3NzI4MjdmLCAtMzIuODM5MDc5MTkzMjMwMjlmLCA5LjgwMzQ3MTQxNjE0MzQ1MmYsIC0yNS42NjU2ODkzNDE1NjgyNDNmLCAxNy4wNTM3NjEyMjQ3NTMxMTdmLCAtNDYuMzg3NTAwNzc5ODgzN2YsIC0xNS44ODUxMjAwNTU1ODQ3NTdmfTtcclxuICAgICAgICAgICAgbm4ud2VpZ2h0c1swXVs5XSA9IG5ldyBmbG9hdFtdIHsgNDQuODc1NTcyNjY2MDAyMjRmLCAyNi4wMTQ4NjU4MzA1NDc1NzhmLCA0MC42OTM2NTg2NzkxMTU0M2YsIC0zMS44NTA5NTk4MTc4MDk1ZiwgMjIuMjE0MzA1NTI3NjA4MDZmLCAtMjcuMDgxMTg3MjkxNTc0Mjg1ZiwgLTQuNzI1NzMzNzUwODM3NzI2ZiwgMy45NzY4Mzc1NzA3NjgyNDY2ZiwgLTExLjM1NzA5Mjk3OTA2NDcxN2YsIC0xNC4xODQxNDA5MDk1NDg5MTVmLCAtMzMuMjczMDAxODQ1NTg3NTE1ZiwgNDYuODExMDg3NTIxMTcwNzZmIH07XHJcbiAgICAgICAgICAgIG5uLndlaWdodHNbMV1bMF0gPSBuZXcgZmxvYXRbXSB7IDAuNTMyNDQxODQyNjE3NjcyZiwgLTcuMDg4Mzg2ODA2MjM0OTAxZiwgLTEyLjIwMDE0NjE1MDg2ODQ0OWYsIDQ1LjU2NzkyNzkyNjU3NzU5NmYsIDYuNDgzODQ3NjI3NjQxNTU5ZiwgLTcuMzY4MzI1MDk2MjYwOTExZiwgLTQzLjQ1MzY0NTg4OTM5Mjg5ZiwgMTcuMDIyNjU3Nzk4MTQ4MDZmLCAtNDcuMjM5NzI3MzM5MzUzMjlmLCAtMTguMzA4NzY5Mzg0NTQyODRmIH07XHJcbiAgICAgICAgICAgIG5uLndlaWdodHNbMV1bMV0gPSBuZXcgZmxvYXRbXSB7IC0zOC44NzU2Njg2NzY5Nzc4MjRmLCAtMzEuNzEzODExOTk4MTIyMjg1ZiwgLTEzLjA1MTAzODg3MDE0NjA0NGYsIC0zMy43OTM4MDcxMTUzMDk3OGYsIC0xOS4yODYyODM2NTAxMDMxNThmLCAtNDguMTcwMTYzODA3NTM4NDE1ZiwgMzAuNzEwMjQxMTg5NTU3MjM3ZiwgMjAuODA2MzQ4NDk2NDkyMTlmLCAtNC43NzM5ODcxNTY2OTk0MDVmLCAzNy41MzY5OTE5NDA1OTU2N2YgfTtcclxuICAgICAgICAgICAgbm4ud2VpZ2h0c1sxXVsyXSA9IG5ldyBmbG9hdFtdIHsgLTkuODk5NDA2NzY4MzM0NzVmLCAtMTkuMTgzMTY4NzMyMTgwODA3ZiwgOS44MzM1MjkwMTQwNjI4NDdmLCAtNDcuMzE1NjI0Nzc0MTE0OTlmLCAtMi4xNDM4ODg4MDUxMjg1ODNmLCA0NC41MzM2ODE5NjAwOTM2NDVmLCAtMjQuMzEyNjA0NDg2MTU2NTM4ZiwgMzMuMDc1NDAwMzQwODcxNjFmLCAtMTEuMDIzMDgxOTE0MDY2ODQzZiwgMi43MzI3NDM5OTkzMzA2Nzk3ZiB9O1xyXG4gICAgICAgICAgICBubi53ZWlnaHRzWzFdWzNdID0gbmV3IGZsb2F0W10geyAtMzAuNjkyOTkyNzY5NTA0NDNmLCAtMTQuNTk1Nzc2ODcyOTg2ODI1ZiwgLTE4LjU2NTk0MzEyNDAzNjI3N2YsIC00OC41ODMwMTc3MDgwNzM4NWYsIDI1Ljc5ODc3OTIwMjUzMTQ1ZiwgLTM4Ljk1Nzg0NjY3MTc4ODg4NmYsIC00NC4zMDc4NjE5NDAxNDcyOWYsIC00Mi45NjYxNzk4NzIzODE1OWYsIDMuNDAxODQ5OTU1OTczMTQ4ZiwgMzEuMzkzMzQ3NzY1MDM2NTUyZiB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFNuYWtlIHNuYWtlID0gbmV3IFNuYWtlKCk7XHJcbiAgICAgICAgICAgIHNuYWtlLlN0YXJ0R2FtZSgwKTtcclxuICAgICAgICAgICAgc25ha2UuTG9vcEdhbWUoMCwgbm4sIDEwMCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZztcclxuXHJcbm5hbWVzcGFjZSBTbmFrZV9Tb2xvX1J1blxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTmV1cmFsTmV0d29ya1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgaW50W10gTGF5ZXJzOyAvL3RoaXMgZmllbGQgc3RvcmVzIHRoZSBsYXllciBpbmZvcm1hdGlvbiB3aGljaCBpcyBhbiAxRCBhcnJheS4gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vRXg6IFszIDIgMiAxXSBhcnJheSBtZWFucyB0aGUgbmV0d29yayBoYXZlIDQgbGF5ZXJzIGluIHRvdGFsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8xc3QgKGlucHV0KSBsYXllciBoYXMgMyBuZXVyb25zIChvciAyIG5ldXJvbnMgKyAxIGJpYXMpLCAybmQsIGFuZCAzcmQgbGF5ZXIgaGF2ZSAyIG5ldXJvbiAob3IgMSBuZXVyb24gKyAxIGJpYXMpLCA0dGggKG91dHB1dCkgbGF5ZXIgaGFzIDEgbmV1cm9uLiBcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdFtdW10gbmV1cm9uczsgLy90aGlzIGZpZWxkIHN0b3JlcyB2YWx1ZXMgb2YgbmV1cm9ucyB3aGljaCBpcyBhIDJEIGFycmF5OiBbbSBsYXllcnMgPSBtIHJvd3NdW2FycmF5IG9mIG5ldXJvbiB2YWx1ZXNdLiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1Zpc3VhbCBFeDogWyBbMSAyIDNdICAgcm93IDE6IChhcnJheSBjb250YWluaW5nIHZhbHVlcyBvZiAzIG5ldXJvbnMgaW4gMXN0IGxheWVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIFsxIDJdICAgICAoYXJyYXkgY29udGFpbmluZyB2YWx1ZXMgb2YgMiBuZXVyb25zIGluIDJuZCBsYXllcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBbMSAyXSAgICAgLi4uLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIFsxXSAgICBdICAoYXJyYXkgY29udGFpbmluZyB2YWx1ZSBvZiAxIG5ldXJvbiBpbiA0dGggbGF5ZXIpXHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdFtdW11bXSB3ZWlnaHRzOyAvL3RoaXMgZmllbGQgc3RvcmVzIHZhbHVlcyBvZiB3ZWlnaHRzIHdoaWNoIGlzIGEgM0QgYXJyYXk6IFsobS0xKSByb3ddW251bWJlciBvZiBuZXVyb24gaW4gbGF5ZXJdW251bWJlciBvZiB3ZWlnaHRzIGluIG5ldXJvbl0uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVmlzdWFsIEV4OiBbIFsgWzEgMiAzXSBbXSBdICAgcm93IDE6IChPdXRlciBhcnJheSAoY2FsbGVkIGphZ2dlZCBhcnJheSkgY29udGFpbmluZyBpbm5lciBhcnJheXMgY29udGFpbmluZyB2YWx1ZXMgb2Ygd2VpZ2h0cy4gMXN0IGlubmVyIGFycmF5IGNvbnRhaW5zIHdlaWdodHMgb2YgY29ubmVjdGlvbnMgZnJvbSB7MiBuZXVyb25zICsgMX0gYmlhcyBpbiAxc3QgbGF5ZXIgdG8gMXN0IG5ldXJvbiBpbiAybmQgbGF5ZXIuIFtdIHJlcHJlc2VudHMgYmlhcyBpbiAybmQgbGF5ZXIgd2hpY2ggZG9lc250IGhhdmUgYW55IGluY29taW5nIGNvbm5lY3Rpb24gc28gaXQgaXMgYW4gZW1wdHkgaW5uZXIgYXJyYXkuKSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICBbIFsxIDJdIFtdIF0gICAgICAgLi4uLiAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgWyBbMSAyXSBdICAgICAgXSBhcnJheSBjb250YWluaW5nIGFycmF5IGNvbnRhaW5pbmcgdmFsdWVzIG9mIHdlaWdodHMuIFRoZSBpbm5lciBhcnJheSBjb250YWlucyB3ZWlnaHRzIG9mIGNvbm5lY3Rpb25zIGZyb20gezEgbmV1cm9uICsgMSBiaWFzfSBpbiAzcmQgbGF5ZXIgdG8gMSBuZXVyb24gaW4gNHRoIGxheWVyLiBPdXRwdXQgbGF5ZXIgZG9lc250IGhhdmUgYmlhcy4pXHJcblxyXG4gICAgICAgIHByaXZhdGUgUmFuZG9tIHJhbmRvbTtcclxuXHJcbiAgICAgICAgcHVibGljIGZsb2F0IEZpdG5lc3MgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgTmV1cmFsTmV0d29yayhpbnRbXSBsYXllcnMsIFJhbmRvbSByYW5kb20pIC8vY29uc3RydWN0b3IuIHRoZSBsYXllciBwYXJhbWV0ZXIgdGVsbHMgaG93IG1hbnkgbGF5ZXIgaW4gdGhlIG5ldHdvcmsgYW5kIGhvdyBtYW55IG5ldXJvbiBpbiBlYWNoIGxheWVyLlxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIExheWVycyA9IG5ldyBpbnRbbGF5ZXJzLkxlbmd0aF07XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgbGF5ZXJzLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBMYXllcnNbaV0gPSBsYXllcnNbaV07IC8vc3RvcmUgaW5wdXQgdG8gZmllbGQgTGF5ZXIuIExheWVyW2ldIGlzIHRoZSBudW1iZXIgb2YgbmV1cm9uIGluIDAgbGF5ZXIuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vcmFuZG9tID0gbmV3IFJhbmRvbShTeXN0ZW0uRGF0ZVRpbWUuVG9kYXkuTWlsbGlzZWNvbmQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yYW5kb20gPSByYW5kb207XHJcblxyXG4gICAgICAgICAgICBDcmVhdGVOZXVyb25zKCk7XHJcbiAgICAgICAgICAgIENyZWF0ZVdlaWdodHMoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQ3JlYXRlTmV1cm9ucygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL05ldXJvbiBpbml0aWFsaXphdGlvblxyXG4gICAgICAgICAgICBMaXN0PGZsb2F0W10+IG5ldXJvbkxpc3QgPSBuZXcgTGlzdDxmbG9hdFtdPigpOyAvL2NyZWF0ZSBhbiBlbXB0eSBsaXN0IG9mIGZsb2F0IG5ldXJvbiBhcnJheXNcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBMYXllcnMuTGVuZ3RoOyBpKyspIC8vbG9vcCB0aHJvdWdoIGFsbCBsYXllcnNcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmV1cm9uTGlzdC5BZGQobmV3IGZsb2F0W0xheWVyc1tpXV0pOyAvL2FkZCBlbXB0eSBuZXVyb24gYXJyYXlzIHRvIHRoZSBlbXB0eSBuZXVyb24gbGlzdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vV2hlbiB0aGUgbG9vcCBmaW5pc2hlcywgdGhlIGxpc3Qgd2lsbCBjb250YWluIHNvbWUgbnVtYmVyIG9mIGVtcHR5IGFycmF5cy5cclxuXHJcbiAgICAgICAgICAgIG5ldXJvbnMgPSBuZXVyb25MaXN0LlRvQXJyYXkoKTsgLy9jb252ZXJ0IGxpc3Qgb2YgYXJyYXkgdG8gW11bXSAoamFnZ2VkKSBhcnJheSBhbmQgc3RvcmUgaW4gZmllbGQgbmV1cm9uXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQ3JlYXRlV2VpZ2h0cygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMaXN0PGZsb2F0W11bXT4gd2VpZ2h0TGlzdCA9IG5ldyBMaXN0PGZsb2F0W11bXT4oKTsgLy9jcmVhdGUgYW4gZW1wdHkgbGlzdCBvZiBmbG9hdCBbbnVtYmVyIG9mIG5ldXJvbiBpbiBsYXllcl1bbnVtYmVyIG9mIHdlaWdodCBpbiBuZXVyb25dIHdlaWdodCBhcnJheXNcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDE7IGkgPCBMYXllcnMuTGVuZ3RoOyBpKyspIC8vbG9vcCB0aHJvdWdoIGFsbCBsYXllcnMuIE5vdGU6IGkgPSAxIG5vdCAwIGJlY2F1c2UgaW5wdXQgbGF5ZXIgMCBkb2VzbnQgaGF2ZSBpbmNvbWluZyB3ZWlnaHRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTGlzdDxmbG9hdFtdPiBsYXllcldlaWdodExpc3QgPSBuZXcgTGlzdDxmbG9hdFtdPigpOyAvL2NyZWF0ZSBhbiBlbXB0eSBsaXN0IG9mIHdlaWdodCBhcnJheSBmb3IgdGhlIGN1cnJlbnQgbGF5ZXJcclxuICAgICAgICAgICAgICAgIGludCBuZXVyb25JblByZXZpb3VzTGF5ZXIgPSBMYXllcnNbaSAtIDFdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgbmV1cm9uc1tpXS5MZW5ndGg7IGorKykgLy8gbG9vcCB0aHJvdWdoIGFsbCBuZXVyb25zIGluIHRoZSBjdXJyZW50IGxheWVyXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXRbXSBuZXVyb25XZWlnaHRzID0gbmV3IGZsb2F0W25ldXJvbkluUHJldmlvdXNMYXllcl07IC8vY3JlYXRlIGVtcHR5IHdlaWdodCBhcnJheSByZXByZXNlbnRpbmcgYWxsIGNvbm5lY3Rpb25zIGZyb20gcHJldmlvdXMgbGF5ZXIgdG8gMSBuZXVyb24gaW4gdGhlIGN1cnJlbnQgbGF5ZXJcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZXQgdGhlIHdlaWd0aCByYW5kb21seSBiZXR3ZWVuIC0xIGFuZCAxXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgayA9IDA7IGsgPCBuZXVyb25JblByZXZpb3VzTGF5ZXI7IGsrKykgLy9sb29wIHRocm91Z2ggYWxsIG5ldXJvbnMgaW4gdGhlIHByZXZpb3VzIGxheWVyIHRvIHNldHVwIHdlaWdodHMgZm9yIGNvbm5lY3Rpb25zIHRvIDEgbmV1cm9uIGluIHRoZSBjdXJyZW50IHBsYXllclxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9naXZlIHJhbmRvbSB3ZWlnaHRzIHRvIG5ldXJvbiB3ZWlnaHRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldXJvbldlaWdodHNba10gPSAoZmxvYXQpcmFuZG9tLk5leHREb3VibGUoKSAqIDEwMCAtIDUwZjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyV2VpZ2h0TGlzdC5BZGQobmV1cm9uV2VpZ2h0cyk7IC8vYWRkIG5ldXJvbiB3ZWlnaHQgb2YgMSBuZXVyb24gaW4gdGhpcyBjdXJyZW50IGxheWVyIHRvIGxheWVyIHdlaWdodCBsaXN0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL1doZW4gdGhlIGxvb3AgZmluaXNoZXMsIHRoZSBsaXN0IHdpbGwgY29udGFpbiBub24tZW1wdHkgd2VpZ2h0IGFycmF5cyBvZiB0aGUgY3VycmVudCBsYXllciBcclxuXHJcbiAgICAgICAgICAgICAgICB3ZWlnaHRMaXN0LkFkZChsYXllcldlaWdodExpc3QuVG9BcnJheSgpKTsgLy9jb252ZXJ0IHRoZSBsYXllciB3ZWlnaHQgbGlzdCBvZiBbXSB3ZWlnaHQgYXJyYXlzIHRvIFtdW10gYXJyYXkgYW5kIGFkZCB0byB3ZWlnaHQgbGlzdC5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL1doZW4gdGhlIGxvb3AgZmluaXNoZXMsIHRoZSBsaXN0IHdpbGwgY29udGFpbiBbXVtdIGFycmF5cyBvZiBhbGwgbGF5ZXJzXHJcblxyXG4gICAgICAgICAgICB3ZWlnaHRzID0gd2VpZ2h0TGlzdC5Ub0FycmF5KCk7IC8vY29udmVydCB3ZWlnaHQgbGlzdCBvZiBbXVtdIGFycmF5cyB0byBbXVtdW10gYXJyYXkgYW5kIHN0b3JlIGluIGZpZWxkIHdlaWdodHMuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXRbXSBGZWVkRm93YXJkKGZsb2F0W10gaW5wdXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL0FkZCBpbnB1dCB0byB0aGUgbmV1cm9uIGluIGlucHV0IGxheWVyIDBcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBpbnB1dC5MZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmV1cm9uc1swXVtpXSA9IGlucHV0W2ldOyAvLyBpdGggaW5wdXQgPSBpdGggbmV1cm9uIGluIGxheWVyIDAuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAxOyBpIDwgTGF5ZXJzLkxlbmd0aDsgaSsrKSAvL2xvb3AgdGhyb3VnaCBhbGwgbGF5ZXJzXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGogPSAwOyBqIDwgbmV1cm9uc1tpXS5MZW5ndGg7IGorKykgLy8gbG9vcCB0aHJvdWdoIGFsbCBuZXVyb25zIGluIHRoZSBjdXJyZW50IGxheWVyXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXQgdmFsdWUgPSAwLjI1ZjsgLy9jcmVhdGUgYSBjb25zdGFudCBiaWFzIGZvciB0aGUgc3VtXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgayA9IDA7IGsgPCBuZXVyb25zW2kgLSAxXS5MZW5ndGg7IGsrKykgLy9sb29wIHRocm91Z2ggYWxsIG5ldXJvbiBpbiB0aGUgcHJldmlvdXMgbGF5ZXJcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICs9IHdlaWdodHNbaSAtIDFdW2pdW2tdICogbmV1cm9uc1tpIC0gMV1ba107IC8vc3VtIG9mIFt3ZWlnaHQgdGltZXMgbmV1cm9uIHZhbHVlXSBmcm9tIHByZXZpb3VzIGxheWVyXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmV1cm9uc1tpXVtqXSA9IDEgLyAoMSArIChmbG9hdClNYXRoLkV4cCgtdmFsdWUpKTsgLy9zaWdtb2lkIGFjdGl2YXRpb24gdG8gY29udmVydCB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldXJvbnNbbmV1cm9ucy5MZW5ndGggLSAxXTsgLy9yZXR1cm4gb3V0cHV0IGxheWVyXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nO1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIFNuYWtlX1NvbG9fUnVuXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBTbmFrZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBweCA9IDEwO1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBweSA9IDEwO1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBncyA9IDIwO1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCB0YyA9IDIwO1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBheCA9IDE1O1xyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBheSA9IDE1OyAvL3NldCBpbml0aWFsIHgteSBjb3JkaW5hdGUgb2YgdGhlIGFwcGxlXHJcbiAgICAgICAgcHVibGljIGZsb2F0IHZ4ID0gMDtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgdnkgPSAwOyAvLyBzZXQgaW5pdGlhbCB4LXkgdmVsb2NpdHkgb2YgdGhlIHNuYWtlXHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdFtdIHRyYWlsO1xyXG5cdFx0cHJpdmF0ZSBmbG9hdCB0YWlsID0gMzsgLy9pbnRpYWwgbGVuZ3RoIG9mIHRoZSBzbmFrZSovIFxyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgZmxvYXQgZGlzdGFuY2UgPSAwO1xyXG4gICAgICAgIHByaXZhdGUgZmxvYXQgbmV3RGlzdGFuY2UgPSAwO1xyXG4gICAgICAgIHByaXZhdGUgZmxvYXQgb2xkRGlzdGFuY2UgPSAwOyAgICAgICBcclxuXHJcblx0XHRwdWJsaWMgZmxvYXQgc2NvcmUgPSAwOyAvLz0gU25ha2Uuc2NvcmU7XHJcbiAgICAgICAgcHVibGljIGludCBkaWUgPSAwOyAvLz0gU25ha2UuZGllO1xyXG5cclxuICAgICAgICBwcml2YXRlIGZsb2F0IHdhbGxVcDsgLy89IDEtdGhpcy5weS8odGhpcy50Yy0xKTtcclxuICAgICAgICBwcml2YXRlIGZsb2F0IHdhbGxEb3duOyAvLz0gdGhpcy5weS8odGhpcy50Yy0xKTtcclxuICAgICAgICBwcml2YXRlIGZsb2F0IHdhbGxMZWZ0OyAvLz0gMS10aGlzLnB4Lyh0aGlzLnRjLTEpO1xyXG4gICAgICAgIHByaXZhdGUgZmxvYXQgd2FsbFJpZ2h0OyAvLyA9IHRoaXMucHgvKHRoaXMudGMtMSk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZmxvYXQgZm9vZFVwO1xyXG4gICAgICAgIHByaXZhdGUgZmxvYXQgZm9vZERvd247XHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdCBmb29kTGVmdDtcclxuICAgICAgICBwcml2YXRlIGZsb2F0IGZvb2RSaWdodDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdCBib2R5VXAgPSAyMDA7XHJcblx0XHRwcml2YXRlIGZsb2F0IGJvZHlEb3duID0gMjAwO1xyXG5cdFx0cHJpdmF0ZSBmbG9hdCBib2R5TGVmdCA9IDIwMDtcclxuXHRcdHByaXZhdGUgZmxvYXQgYm9keVJpZ2h0PSAyMDA7XHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdCBhbGl2ZVRpbWUgPSAyODAwO1xyXG5cclxuICAgICAgICBwcml2YXRlIExpc3Q8ZmxvYXQ+IGlucHV0TGlzdCA9IG5ldyBMaXN0PGZsb2F0PigpOyAvL2lucHV0IGZvciBuZXVyYWwgbmV0d29yaywgd2lsbCBiZSBjb252ZXJ0ZWQgdG8gYXJyYXlcclxuICAgICAgICBwcml2YXRlIFRpbWVyIHRpbWVyO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTdGFydEdhbWUoaW50IGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvKnZhciBjYW52ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnY1wiICsgYSk7XHJcbiAgICAgICAgICAgIHZhciBjdHggPSBjYW52LmdldENvbnRleHQoXCIyZFwiKTsqL1xyXG4gICAgICAgICAgICBSZXNldChhKTsgLyp0aGlzLlJlc2V0KGNhbnYsY3R4LGEpOyovXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIFNuYWtlLmtleVB1c2gpOyAvLyB3aGVuIGtleWRvd24sIGNhbGwgZnVuY3Rpb24ga2V5UHVzaFxyXG4gICAgICAgICAgICAvL0RlY2lzaW9uKGEpO1xyXG4gICAgICAgICAgICAvL1NuYWtlLmludGVydmFsSWQgPSBzZXRJbnRlcnZhbChTbmFrZS5HYW1lLDEwMCxjYW52LCBjdHgsIGEpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlc2V0KGludCBhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHggPSAxMDtcclxuICAgICAgICAgICAgcHkgPSAxMDtcclxuICAgICAgICAgICAgZ3MgPSAyMDtcclxuICAgICAgICAgICAgdGMgPSAyMDtcclxuICAgICAgICAgICAgYWxpdmVUaW1lID0gMjgwMDtcclxuICAgICAgICAgICAgdnggPSAwO1xyXG4gICAgICAgICAgICB2eSA9IDA7IC8vIHNldCBpbml0aWFsIHgteSB2ZWxvY2l0eSBvZiB0aGUgc25ha2VcclxuICAgICAgICAgICAgLyp0aGlzLnRyYWlsID0gW107Ki9cclxuICAgICAgICAgICAgdGFpbCA9IDM7IC8vaW50aWFsIGxlbmd0aCBvZiB0aGUgc25ha2VcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRpc3RhbmNlID0gMDtcclxuICAgICAgICAgICAgbmV3RGlzdGFuY2UgPSAwO1xyXG4gICAgICAgICAgICBvbGREaXN0YW5jZSA9IDA7XHJcbiAgICAgICAgICAgIHNjb3JlID0gMDsgLy89IFNuYWtlLnNjb3JlO1xyXG4gICAgICAgICAgICBkaWUgPSAwOy8vPSBTbmFrZS5kaWU7XHJcbiAgICAgICAgICAgIC8vc2V0IGluaXRpYWwgeC15IGNvcmRpbmF0ZSBvZiB0aGUgYXBwbGVcclxuICAgICAgICAgICAgLyp2YXIgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMudGMpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJhbmRvbVkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLnRjKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgdGhpcy50cmFpbC5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFpbFtpXS54ID09IHJhbmRvbVggJiYgdGhpcy50cmFpbFtpXS55ID09IHJhbmRvbVkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5kb21YID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy50Yyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbVkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLnRjKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF4ID0gcmFuZG9tWDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXkgPSByYW5kb21ZOyovXHJcblxyXG4gICAgICAgICAgICAvKmN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7IC8vIHNldCBiYWNrZ3JvdW5kIGNvbG9yXHJcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52LndpZHRoLCBjYW52LmhlaWdodCk7XHJcblxyXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJncmVlblwiO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudHJhaWwubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLnRyYWlsW2ldLnggKiB0aGlzLmdzLCB0aGlzLnRyYWlsW2ldLnkgKiB0aGlzLmdzLCB0aGlzLmdzIC0gMiwgdGhpcy5ncyAtIDIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZWRcIjtcclxuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMuYXggKiB0aGlzLmdzLCB0aGlzLmF5ICogdGhpcy5ncywgdGhpcy5ncyAtIDIsIHRoaXMuZ3MgLSAyKTtcclxuICAgICAgICAgICAgKi9cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEdhbWUoaW50IGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhbGl2ZVRpbWUgLT0gMjU7XHJcbiAgICAgICAgICAgIHNjb3JlICs9IDAuMjVmO1xyXG4gICAgICAgICAgICBweCArPSB2eDtcclxuICAgICAgICAgICAgcHkgKz0gdnk7XHJcbiAgICAgICAgICAgIGlmIChweCA8IDAgfHwgcHggPiB0YyAtIDEgfHwgcHkgPCAwIHx8IHB5ID4gdGMgLSAxKVxyXG4gICAgICAgICAgICB7IC8vIGlmIHNuYWtlIGlzIG91dCBvZiBsZWZ0IGJvdW5kIHB4ID0gdGMtMTtcclxuICAgICAgICAgICAgICAgIGRpZSA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aW1lci5DaGFuZ2UoVGltZW91dC5JbmZpbml0ZSwgVGltZW91dC5JbmZpbml0ZSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLypjdHguZmlsbFN0eWxlID0gXCJibGFja1wiOyAvLyBzZXQgYmFja2dyb3VuZCBjb2xvclxyXG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2Fudi53aWR0aCwgY2Fudi5oZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiZ3JlZW5cIjtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRyYWlsLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QodGhpcy50cmFpbFtpXS54ICogdGhpcy5ncywgdGhpcy50cmFpbFtpXS55ICogdGhpcy5ncywgdGhpcy5ncyAtIDIsIHRoaXMuZ3MgLSAyKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYWlsLmxlbmd0aCA+IDMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHJhaWxbaV0ueCA9PSB0aGlzLnB4ICYmIHRoaXMudHJhaWxbaV0ueSA9PSB0aGlzLnB5KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVyLkNoYW5nZSgtMSwtMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnRyYWlsLnB1c2goe3g6dGhpcy5weCwgeTp0aGlzLnB5fSk7XHJcblx0XHQgICAgd2hpbGUodGhpcy50cmFpbC5sZW5ndGg+dGhpcy50YWlsKXtcclxuXHRcdFx0ICAgIHRoaXMudHJhaWwuc2hpZnQoKTtcclxuXHRcdCAgICB9Ki9cclxuXHJcbiAgICAgICAgICAgIGlmIChheCA9PSBweCAmJiBheSA9PSBweSkgLy8gaWYgcG9zaXRpb24gb2Ygc25ha2UgaXMgYXQgdGhlIGFwcGxlXHJcbiAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICB0YWlsKys7IC8vIGl0IGdyb3dzIDEgc2l6ZVxyXG4gICAgICAgICAgICAgICAgc2NvcmUgKz0gMTA7XHJcbiAgICAgICAgICAgICAgICAvKnRoaXMuYWxpdmVUaW1lICs9IDI1MDA7Ki8gXHJcbiAgICAgICAgICAgICAgICAvLyB0aGVuIGFwcGxlIHBvc2l0aW9uIGFwcGVhcnMgcmFuZG9tbHkgZWxzZXdoZXJlXHJcbiAgICAgICAgICAgICAgICAvKnZhciByYW5kb21YID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy50Yyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmFuZG9tWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMudGMpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCB0aGlzLnRyYWlsLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYWlsW2ldLnggPT0gcmFuZG9tWCAmJiB0aGlzLnRyYWlsW2ldLnkgPT0gcmFuZG9tWSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbVggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLnRjKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9tWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMudGMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYXggPSByYW5kb21YO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5heSA9IHJhbmRvbVk7Ki9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLyp0aGlzLmRpc3RhbmNlID0gTWF0aC5zcXJ0KE1hdGgucG93KCh0aGlzLmF4IC0gdGhpcy5weCksIDIpICsgTWF0aC5wb3coKHRoaXMuYXkgLSB0aGlzLnB5KSwgMikpOyovXHJcbiAgICAgICAgICAgIG5ld0Rpc3RhbmNlID0gZGlzdGFuY2U7XHJcbiAgICAgICAgICAgIC8vaWYgdGhlIHNuYWtlIG1vdmVzIGF3YXkgZnJvbSB0aGUgYXBwbGUsIGl0IGxvc2VzIHBvaW50XHJcbiAgICAgICAgICAgIGlmIChuZXdEaXN0YW5jZSA+IG9sZERpc3RhbmNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzY29yZSAtPSAxLjVmO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgeyBzY29yZSArPSAxZjsgfVxyXG4gICAgICAgICAgICBvbGREaXN0YW5jZSA9IGRpc3RhbmNlO1xyXG4gICAgICAgICAgICAvKmlmICh0aGlzLmFsaXZlVGltZSA8PSAwLjApeyB0aGlzLmRpZSA9IDE7IHRoaXMudGltZXIuQ2hhbmdlKC0xLC0xKTsgfSovXHJcbiAgICAgICAgICAgIC8qY3R4LmZpbGxTdHlsZSA9IFwicmVkXCI7XHJcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLmF4ICogdGhpcy5ncywgdGhpcy5heSAqIHRoaXMuZ3MsIHRoaXMuZ3MgLSAyLCB0aGlzLmdzIC0gMik7Ki9cclxuXHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBmbG9hdFtdIEdldElucHV0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdhbGxVcCA9IDEgLSBweS8odGMgLSAxKTtcclxuICAgICAgICAgICAgd2FsbERvd24gPSBweSAvICh0YyAtIDEpO1xyXG4gICAgICAgICAgICB3YWxsTGVmdCA9IDEgLSBweCAvICh0YyAtIDEpO1xyXG4gICAgICAgICAgICB3YWxsUmlnaHQgPSBweCAvICh0YyAtIDEpO1xyXG5cclxuICAgICAgICAgICAgLy9DYWxjdWxhdGUgZGlzdGFuY2UgZnJvbSBoZWFkIHRvIGZvb2QgaW4gNCBkaXJlY3Rpb25zIFVwLCBEb3duLCBMZWZ0LCBSaWdodFxyXG4gICAgICAgICAgICB2YXIgbWluVXAgPSB0YyAtIDE7XHJcbiAgICAgICAgICAgIHZhciBtaW5Eb3duID0gdGMgLSAxO1xyXG4gICAgICAgICAgICB2YXIgbWluTGVmdCA9IHRjIC0gMTtcclxuICAgICAgICAgICAgdmFyIG1pblJpZ2h0ID0gdGMgLSAxO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8qaWYgKHRoaXMuYXggPT0gdGhpcy5weClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXkgPiB0aGlzLnB5KVxyXG4gICAgICAgICAgICAgICAgeyAvLyBmb29kIGFib3ZlIGhlYWRcclxuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy5heSAtIHRoaXMucHkpID4gbWluVXApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbWluVXAgPSBNYXRoLmFicyh0aGlzLmF5IC0gdGhpcy5weSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmF5IDwgdGhpcy5weSlcclxuICAgICAgICAgICAgICAgIHsgLy9mb29kIGJlbG93IGhlYWRcclxuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy5heSAtIHRoaXMucHkpID4gbWluRG93bilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBtaW5Eb3duID0gTWF0aC5hYnModGhpcy5heSAtIHRoaXMucHkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF5ID09IHRoaXMucHkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF4ID4gdGhpcy5weClcclxuICAgICAgICAgICAgICAgIHsgLy8gZm9vZCBsZWZ0IG9mIGhlYWRcclxuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy5heCAtIHRoaXMucHgpID4gbWluTGVmdClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBtaW5MZWZ0ID0gTWF0aC5hYnModGhpcy5heCAtIHRoaXMucHgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5heCA8IHRoaXMucHgpXHJcbiAgICAgICAgICAgICAgICB7IC8vZm9vZCByaWdodCBvZiBoZWFkXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMuYXggLSB0aGlzLnB4KSA+IG1pblJpZ2h0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG1pblJpZ2h0ID0gTWF0aC5hYnModGhpcy5heCAtIHRoaXMucHgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9Ki9cclxuXHJcbiAgICAgICAgICAgIC8vTm9ybWFsaXplIGRhdGE6IHNxdWVlemUgZGF0YSBiZXR3ZWVuIDAgKGZhcikgYW5kIDEgKGNsb3NlKS4gSSBkb250IGtub3cgd2h5IG15IGxvZ2ljIGlzIHJldmVyc2VkIGluIGRpcmVjdGlvblxyXG4gICAgICAgICAgICBmb29kVXAgPSAxIC0gbWluRG93biAvICh0YyAtIDEpOyAvL0kgZG9udCBrbm93IHdoeSBteSBsb2dpYyBtYWtlcyBzZW5zZSBidXQgdGhlIHJlc3VsdHMgYXJlIHJldmVyc2VkIGluIGRpcmVjdGlvbnMgc28gdGhlIHF1aWNrIGZpeGVzIGFyZSBsaWtlIHRoZXNlLlxyXG4gICAgICAgICAgICBmb29kRG93biA9IDEgLSBtaW5VcCAvICh0YyAtIDEpO1xyXG4gICAgICAgICAgICBmb29kTGVmdCA9IDEgLSBtaW5SaWdodCAvICh0YyAtIDEpO1xyXG4gICAgICAgICAgICBmb29kUmlnaHQgPSAxIC0gbWluTGVmdCAvICh0YyAtIDEpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vQ2FsY3VsYXRlIGRpc3RhbmNlIGZyb20gaGVhZCB0byBib2R5IGluIDQgZGlyZWN0aW9uc1xyXG4gICAgICAgICAgICAvL1Jlc2V0IHRoZSB2YXJzXHJcbiAgICAgICAgICAgIG1pblVwID0gdGMgLSAxO1xyXG4gICAgICAgICAgICBtaW5Eb3duID0gdGMgLSAxO1xyXG4gICAgICAgICAgICBtaW5MZWZ0ID0gdGMgLSAxO1xyXG4gICAgICAgICAgICBtaW5SaWdodCA9IHRjIC0gMTtcclxuXHJcbiAgICAgICAgICAgIC8qZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRyYWlsLmxlbmd0aCAtIDE7IGkrKylcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYWlsW2ldLnggPT0gdGhpcy5weClcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHJhaWxbaV0ueSA+IHRoaXMucHkpXHJcbiAgICAgICAgICAgICAgICAgICAgey8vYm9keSBhYm92ZSBoZWFkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnRyYWlsW2ldLnkgLSB0aGlzLnB5KSA+IG1pblVwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pblVwID0gTWF0aC5hYnModGhpcy50cmFpbFtpXS55IC0gdGhpcy5weSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnRyYWlsW2ldLnkgPCB0aGlzLnB5KVxyXG4gICAgICAgICAgICAgICAgICAgIHsvL2JvZHkgYmVsb3cgaGVhZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy50cmFpbFtpXS55IC0gdGhpcy5weSkgPiBtaW5Eb3duKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRvd24gPSBNYXRoLmFicyh0aGlzLnRyYWlsW2ldLnkgLSB0aGlzLnB5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJhaWxbaV0ueSA9PSB0aGlzLnB5KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYWlsW2ldLnggPiB0aGlzLnB4KVxyXG4gICAgICAgICAgICAgICAgICAgIHsvL2JvZHkgbGVmdCBvZiBoZWFkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnRyYWlsW2ldLnggLSB0aGlzLnB4KSA+IG1pbkxlZnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluTGVmdCA9IE1hdGguYWJzKHRoaXMudHJhaWxbaV0ueCAtIHRoaXMucHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnRyYWlsW2ldLnggPCB0aGlzLnB4KVxyXG4gICAgICAgICAgICAgICAgICAgIHsvL2JvZHkgcmlnaHQgb2YgaGVhZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy50cmFpbFtpXS54IC0gdGhpcy5weCkgPiBtaW5SaWdodClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5SaWdodCA9IE1hdGguYWJzKHRoaXMudHJhaWxbaV0ueCAtIHRoaXMucHgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0qL1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vTm9ybWFsaXplIGRhdGE6IHNxdWVlemUgZGF0YSBiZXR3ZWVuIDAgYW5kIDFcclxuICAgICAgICAgICAgYm9keVVwID0gMSAtIG1pbkRvd24gLyAodGMgLSAxKTtcclxuICAgICAgICAgICAgYm9keURvd24gPSAxIC0gbWluVXAgLyAodGMgLSAxKTtcclxuICAgICAgICAgICAgYm9keUxlZnQgPSAxIC0gbWluUmlnaHQgLyAodGMgLSAxKTtcclxuICAgICAgICAgICAgYm9keVJpZ2h0ID0gMSAtIG1pbkxlZnQgLyAodGMgLSAxKTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlucHV0TGlzdC5DbGVhcigpO1xyXG5cclxuICAgICAgICAgICAgaW5wdXRMaXN0LkFkZCh3YWxsVXApO1xyXG4gICAgICAgICAgICBpbnB1dExpc3QuQWRkKHdhbGxEb3duKTtcclxuICAgICAgICAgICAgaW5wdXRMaXN0LkFkZCh3YWxsTGVmdCk7XHJcbiAgICAgICAgICAgIGlucHV0TGlzdC5BZGQod2FsbFJpZ2h0KTtcclxuICAgICAgICAgICAgaW5wdXRMaXN0LkFkZChib2R5VXApO1xyXG4gICAgICAgICAgICBpbnB1dExpc3QuQWRkKGJvZHlEb3duKTtcclxuICAgICAgICAgICAgaW5wdXRMaXN0LkFkZChib2R5TGVmdCk7XHJcbiAgICAgICAgICAgIGlucHV0TGlzdC5BZGQoYm9keVJpZ2h0KTtcclxuICAgICAgICAgICAgaW5wdXRMaXN0LkFkZChmb29kVXApO1xyXG4gICAgICAgICAgICBpbnB1dExpc3QuQWRkKGZvb2REb3duKTtcclxuICAgICAgICAgICAgaW5wdXRMaXN0LkFkZChmb29kTGVmdCk7XHJcbiAgICAgICAgICAgIGlucHV0TGlzdC5BZGQoZm9vZFJpZ2h0KTtcclxuICAgICAgICAgICAgZmxvYXRbXSBpbnB1dHMgPSBpbnB1dExpc3QuVG9BcnJheSgpOyAvLzEyIGlucHV0IG5ldXJvbnNcclxuICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dHM7XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERlY2lzaW9uKE5ldXJhbE5ldHdvcmsgbWVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXRbXSBvdXRwdXRzID0gbWVtYmVyLkZlZWRGb3dhcmQoR2V0SW5wdXQoKSk7IC8vZ2V0IG91dHB1dCBuZXVyb25zIGZyb20gdGhlIG5ldHdvcmtcclxuICAgICAgICAgICAgZmxvYXQgbWF4VmFsdWUgPSBvdXRwdXRzLk1heCgpO1xyXG4gICAgICAgICAgICBpbnQgbWF4SW5kZXggPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvTGlzdDxmbG9hdD4ob3V0cHV0cykuSW5kZXhPZihtYXhWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKG1heEluZGV4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UdXJuIGxlZnRcclxuICAgICAgICAgICAgICAgICAgICBpZiAodnggPT0gMSlcclxuICAgICAgICAgICAgICAgICAgICB7IC8vIGlmIHNuYWtlIGlzIGhlYWRpbmcgcmlnaHRcclxuICAgICAgICAgICAgICAgICAgICB9IC8vIGRvIG5vdGhpbmcuIFRoaXMgcHJldmVudHMgdGhlIHNuYWtlIG1vdmVzIGJhY2t3YXJkLiBEbyB0aGUgc2FtZSBmb3Igb3RoZXIga2V5cy5cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2eCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2eSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIC8vVHVybiByaWdodFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2eCA9PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZ4ID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdnkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAvL1R1cm4gZG93blxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2eSA9PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdnggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2eSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAvL1R1cm4gdXBcclxuICAgICAgICAgICAgICAgICAgICBpZiAodnkgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2eCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZ5ID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIExvb3BHYW1lKGludCBhLCBOZXVyYWxOZXR3b3JrIG1lbWJlciwgZmxvYXQgbXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRUaW1lU3BhbiA9IFRpbWVTcGFuLlplcm87XHJcbiAgICAgICAgICAgIHZhciBwZXJpb2RUaW1lU3BhbiA9IFRpbWVTcGFuLkZyb21NaWxsaXNlY29uZHMobXMpO1xyXG4gICAgICAgICAgICAvKnZhciBjYW52ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnY1wiICsgYSk7XHJcbiAgICAgICAgICAgIHZhciBjdHggPSBjYW52LmdldENvbnRleHQoXCIyZFwiKTsqL1xyXG5cclxuICAgICAgICAgICAgdGltZXIgPSBuZXcgVGltZXIoKGUpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdhbWUoYSk7Lyp0aGlzLkdhbWUoY2FudixjdHgsYSkqL1xyXG4gICAgICAgICAgICAgICAgRGVjaXNpb24obWVtYmVyKTtcclxuICAgICAgICAgICAgfSwgbnVsbCwgc3RhcnRUaW1lU3BhbiwgcGVyaW9kVGltZVNwYW4pO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXQp9Cg==
