using Bridge;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading;
using System;

namespace ENN_Snake_Game
{
    public class StartGame
    {
            
            // After building (Ctrl + Shift + B) this project, 
            // browse to the /bin/Debug or /bin/Release folder.

            // A new bridge/ folder has been created and
            // contains your projects JavaScript files. 
            // Open ENN Snake Game.js, uncomment the js code. If there is a js code commented next to the C# code, replace that C# code with the js code.

            // Open the bridge/index.html file in a browser by
            // Right-Click > Open With..., then choose a
            // web browser from the list

            // This application will then run in the browser.

        int populationSize = 220;
        float mutationRate = 0.05f;
        int elitism = 10;
        private string filePath = @"D:\SELF LEARNING\ENN Snake Game\";

        private GA ga;
        public NeuralNetwork nn;
        private static StartGame Tu;
        private Timer timer;
        
        private Random random;
        public List<Snake> SnakeList;
        int deathCount = 0;

        public static void Main()
        {
            Tu = new StartGame();
            Tu.Start();
            /*var button = document.getElementById("BUTTON");
            if (button.addEventListener)
            {
                ENN_Snake_Game.StartGame.Tu = new ENN_Snake_Game.StartGame();
                button.addEventListener('click', function(){ ENN_Snake_Game.StartGame.Tu.Start(); });
            }*/

        }

        public void Start()
        {
            random = new Random();
            
            SnakeList = new List<Snake>(populationSize);
             
            ga = new GA(populationSize, random, elitism, mutationRate, FitnessFunction, 0, 5, filePath); //initialize 1st generation of neural networks

            for (int i = 0; i < ga.Population.Count; i++)
            {
                SnakeList.Add(new Snake());
                SnakeList[i].StartGame(i);
                SnakeList[i].LoopGame(i, ga.Population[i],25);
              
            }
            /*document.getElementById("Generation").innerHTML = this.ga.Generation;

            document.getElementById("fitness").innerHTML = this.ga.BestFitness;*/

            var startTimeSpan = TimeSpan.Zero;
            var periodTimeSpan = TimeSpan.FromMilliseconds(20);

            timer = new Timer((e) =>
            {
                deathCount = 0;
                for (int i = 0; i < populationSize; i++)
                {
                    FitnessFunction(i);
                    deathCount += SnakeList[i].die;
                };
                if (deathCount == populationSize) { timer.Change(Timeout.Infinite, Timeout.Infinite); deathCount = 0; Update(); };
            }, null, startTimeSpan, periodTimeSpan);
            
        }

        void Update()
        {
            ga.NewGeneration();

            for (int i = 0; i < ga.Population.Count; i++)
            {
                SnakeList[i].StartGame(i); //initialize game environment
                SnakeList[i].LoopGame(i, ga.Population[i],25); //run the game using nn
            }
            /*document.getElementById("Generation").innerHTML = this.ga.Generation;

            document.getElementById("fitness").innerHTML = this.ga.BestFitness;*/

            var startTimeSpan = TimeSpan.Zero;
            var periodTimeSpan = TimeSpan.FromMilliseconds(20);
            timer = new Timer((e) =>
            {
                deathCount = 0;
                for (int i = 0; i < populationSize; i++)
                {
                    FitnessFunction(i);
                    deathCount += SnakeList[i].die;
                };
                if (deathCount == populationSize) { timer.Change(Timeout.Infinite, Timeout.Infinite); deathCount = 0; Update(); };
            }, null, startTimeSpan, periodTimeSpan);

          
        }

        public float FitnessFunction(int index)
        {
             return SnakeList[index].score;
        }
    
    }
}