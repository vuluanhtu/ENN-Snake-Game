using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.IO;


namespace ENN_Snake_Game
{
    public class GA
    {
        public List<NeuralNetwork> Population { get; private set; }
        private List<NeuralNetwork> newPopulation;
        public int Generation { get; private set; }
        public float BestFitness { get; private set; } // Create a float variable to contain the best fitness of the population
        public float[][][] BestGenes { get; private set; } // Create a string variable to contain the best gene
        public int elitism;
        public float mutationRate;
        private float fitnessSum;
        private int saveGenes;
        private int loadExternalGenes;
        private int populationSize;
        private string filePath;
        
        private int[] nnLayer = new int[3] { 12, 10, 4 }; // 12-10-4 NN architect. I just choose random architect for simplity
        private Random random;
        public NeuralNetwork bestNetwork;


        public GA(int populationSize, Random random, int elitism, float mutationRate, Func<int,float> fitnessFunction, int loadExternalGenes, int saveGenes, string filePath)
        {
            this.random = random;
            this.elitism = elitism;
            this.mutationRate = mutationRate;
            this.saveGenes = saveGenes;
            this.loadExternalGenes = loadExternalGenes;
            this.populationSize = populationSize;
            this.filePath = filePath;
            Generation = 1;

            Population = new List<NeuralNetwork>(populationSize); // This makes the program doesn't have to resize the population when adding dna.
            newPopulation = new List<NeuralNetwork>(populationSize); // Create a new population list.

            for (int i = 0; i < populationSize; i++)
            {
                if (i < loadExternalGenes)
                {
                    if (filePath == "") { }
                    LoadData(filePath);
                }
                Population.Add(new NeuralNetwork(nnLayer, random, fitnessFunction));
            }
        }

        public void NewGeneration() //Create new population based on the fitness of the previous POPULATION (NOT DNA!)
        {
            if (Population.Count <= 0)
            {
                return;
            }
            CalculatePopulationFitness(); //Call the function calculating fitness of the previous POPULATION (NOT DNA!)
            Population.Sort(CompareDNA);

            if (Generation % 500 == 0) {
                SaveData(filePath);
            }

            
            newPopulation.Clear(); // The old population which this new list may hold from the previous generation/population will be cleared.

            //Crossover loop including mutation
            for (int i = 0; i < Population.Count; i++)
            {
                if (i < elitism)
                {
                    newPopulation.Add(Population[i]);
                }
                else
                {
                    NeuralNetwork parent1 = ChooseParent(); // This function is defined below
                    NeuralNetwork parent2 = ChooseParent();

                    NeuralNetwork child = parent1.Crossover(parent2); // Crossover function is defined in NeuralNetwork.cs

                    child.Mutate(mutationRate);

                    newPopulation.Add(child);
                }

            }

            List<NeuralNetwork> temporaryList = Population; // The population list is saved in a temporary list.
            Population = newPopulation; // Then, the population list is replaced by the new population list. 
            newPopulation = temporaryList; // Then, the old population list is passed to the new population list from the temporary list.
                                           // This way, both the old and new population list are saved

            Generation++;
        }

        public void CalculatePopulationFitness() // This function calculates fitness of a POPULATION (NOT DNA!)
        {
            fitnessSum = 0;
            NeuralNetwork best = Population[0]; // Assume the best dna is the [0] member of the population

            for (int i = 0; i < Population.Count; i++) // loop from the first to the last element of the population
            {
                fitnessSum += Population[i].CalculateFitness(i); // Sum of fitness of all member in the population

                if (Population[i].Fitness > best.Fitness)
                {
                    best = Population[i];
                }
            }

            bestNetwork = best;
            BestFitness = best.Fitness; // Record the best dna fitness value before generating new population
            BestGenes = best.weights; // Record the best gene before generating new population
                                             //CopyTo is a C# function copying an array to another staring at a certain index. 
                                             //In this case, a whole new gene is copied to the old gene starting from 0 which means old gene is replaced by new gene.

        }

        public int CompareDNA(NeuralNetwork a, NeuralNetwork b)
        {
            if (a.Fitness > b.Fitness)
            {
                return -1; // Sort method will arrange a first, b next
            }
            else if (a.Fitness < b.Fitness)
            {
                return 1; // Sort method will arrange b first, a next.
            }
            else
            {
                return 0;
            }
        }

        private NeuralNetwork ChooseParent() // Choose parent (suitable DNA) to crossover
        {
            double randomNumber = random.NextDouble() * fitnessSum;

            for (int i = 0; i < Population.Count; i++) // The loop run through each DNA (Population[i]) in the population
            {
                if (randomNumber < Population[i].Fitness) // If the fitness of the [i] DNA is larger than randomNumber, return the DNA
                {
                    return Population[i];
                }

                randomNumber -= Math.Abs(Population[i].Fitness); // If randomNumber > DNA fitness, randomNumber = randomNumber - DNA fitness. The randomNumber is reduced for the next iteration.
            }

            return null; // If there is no suitable parent, return null.
        }


        // Saving and Retrieving data
        public void SaveData( string filePath)
        {
            SaveData save = new SaveData { SavedMember = new List<NeuralNetwork>() };

            for (int i = 0; i < saveGenes; i++)
            {
                save.SavedMember.Add(Population[i]);
            }

            FileReadWrite.WriteToJsonFile(filePath, save );
        }

        public void LoadData(string filePath)
        {

            SaveData save = FileReadWrite.ReadFromJsonFile<SaveData>(filePath);
            for (int i = 0; i < loadExternalGenes; i++)
            {
                Population.Add(save.SavedMember[i]);
            }
        }
    }
}
