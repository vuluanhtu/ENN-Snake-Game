using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;

namespace Snake_Solo_Run
{
    public class NeuralNetwork
    {
        private int[] Layers; //this field stores the layer information which is an 1D array. 
                              //Ex: [3 2 2 1] array means the network have 4 layers in total, 
                              //1st (input) layer has 3 neurons (or 2 neurons + 1 bias), 2nd, and 3rd layer have 2 neuron (or 1 neuron + 1 bias), 4th (output) layer has 1 neuron. 

        private float[][] neurons; //this field stores values of neurons which is a 2D array: [m layers = m rows][array of neuron values]. 
                                   //Visual Ex: [ [1 2 3]   row 1: (array containing values of 3 neurons in 1st layer)
                                   //             [1 2]     (array containing values of 2 neurons in 2nd layer)
                                   //             [1 2]     ....
                                   //             [1]    ]  (array containing value of 1 neuron in 4th layer)

        public float[][][] weights; //this field stores values of weights which is a 3D array: [(m-1) row][number of neuron in layer][number of weights in neuron].
                                    //Visual Ex: [ [ [1 2 3] [] ]   row 1: (Outer array (called jagged array) containing inner arrays containing values of weights. 1st inner array contains weights of connections from {2 neurons + 1} bias in 1st layer to 1st neuron in 2nd layer. [] represents bias in 2nd layer which doesnt have any incoming connection so it is an empty inner array.) 
                                    //      [ [1 2] [] ]       ....     
                                    //      [ [1 2] ]      ] array containing array containing values of weights. The inner array contains weights of connections from {1 neuron + 1 bias} in 3rd layer to 1 neuron in 4th layer. Output layer doesnt have bias.)

        private Random random;

        public float Fitness { get; private set; }


        public NeuralNetwork(int[] layers, Random random) //constructor. the layer parameter tells how many layer in the network and how many neuron in each layer.
        {

            Layers = new int[layers.Length];
            for (int i = 0; i < layers.Length; i++)
            {
                Layers[i] = layers[i]; //store input to field Layer. Layer[i] is the number of neuron in 0 layer.
            }

            //random = new Random(System.DateTime.Today.Millisecond);

            this.random = random;

            CreateNeurons();
            CreateWeights();

        }

        private void CreateNeurons()
        {
            //Neuron initialization
            List<float[]> neuronList = new List<float[]>(); //create an empty list of float neuron arrays
            for (int i = 0; i < Layers.Length; i++) //loop through all layers
            {
                neuronList.Add(new float[Layers[i]]); //add empty neuron arrays to the empty neuron list
            }
            //When the loop finishes, the list will contain some number of empty arrays.

            neurons = neuronList.ToArray(); //convert list of array to [][] (jagged) array and store in field neuron
        }

        private void CreateWeights()
        {
            List<float[][]> weightList = new List<float[][]>(); //create an empty list of float [number of neuron in layer][number of weight in neuron] weight arrays
            for (int i = 1; i < Layers.Length; i++) //loop through all layers. Note: i = 1 not 0 because input layer 0 doesnt have incoming weight
            {
                List<float[]> layerWeightList = new List<float[]>(); //create an empty list of weight array for the current layer
                int neuronInPreviousLayer = Layers[i - 1];

                for (int j = 0; j < neurons[i].Length; j++) // loop through all neurons in the current layer
                {
                    float[] neuronWeights = new float[neuronInPreviousLayer]; //create empty weight array representing all connections from previous layer to 1 neuron in the current layer

                    //set the weigth randomly between -1 and 1
                    for (int k = 0; k < neuronInPreviousLayer; k++) //loop through all neurons in the previous layer to setup weights for connections to 1 neuron in the current player
                    {
                        //give random weights to neuron weights
                        neuronWeights[k] = (float)random.NextDouble() * 100 - 50f;
                    }

                    layerWeightList.Add(neuronWeights); //add neuron weight of 1 neuron in this current layer to layer weight list
                }
                //When the loop finishes, the list will contain non-empty weight arrays of the current layer 

                weightList.Add(layerWeightList.ToArray()); //convert the layer weight list of [] weight arrays to [][] array and add to weight list.
            }
            //When the loop finishes, the list will contain [][] arrays of all layers

            weights = weightList.ToArray(); //convert weight list of [][] arrays to [][][] array and store in field weights.
        }

        public float[] FeedFoward(float[] input)
        {
            //Add input to the neuron in input layer 0
            for (int i = 0; i < input.Length; i++)
            {
                neurons[0][i] = input[i]; // ith input = ith neuron in layer 0.
            }

            for (int i = 1; i < Layers.Length; i++) //loop through all layers
            {
                for (int j = 0; j < neurons[i].Length; j++) // loop through all neurons in the current layer
                {
                    float value = 0.25f; //create a constant bias for the sum
                    for (int k = 0; k < neurons[i - 1].Length; k++) //loop through all neuron in the previous layer
                    {
                        value += weights[i - 1][j][k] * neurons[i - 1][k]; //sum of [weight times neuron value] from previous layer

                    }

                    neurons[i][j] = 1 / (1 + (float)Math.Exp(-value)); //sigmoid activation to convert value between 0 and 1
                }
            }

            return neurons[neurons.Length - 1]; //return output layer
        }



    }
}