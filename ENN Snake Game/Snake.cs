using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ENN_Snake_Game
{
    public class Snake
    {
        public float px = 10;
        public float py = 10;
        public float gs = 20;
        public float tc = 20;
        public float ax = 15;
        public float ay = 15; //set initial x-y cordinate of the apple
        public float vx = 0;
        public float vy = 0; // set initial x-y velocity of the snake
        private float[] trail;
		private float tail = 3; //intial length of the snake*/ 
        
        private float distance = 0;
        private float newDistance = 0;
        private float oldDistance = 0;       

		public float score = 0;
        public int die = 0; 

        private float wallUp; 
        private float wallDown;
        private float wallLeft;
        private float wallRight;

        private float foodUp;
        private float foodDown;
        private float foodLeft;
        private float foodRight;

        private float bodyUp = 200;
		private float bodyDown = 200;
		private float bodyLeft = 200;
		private float bodyRight= 200;
        private float aliveTime = 2800;

        private List<float> inputList = new List<float>(); //input for neural network, will be converted to array
        private Timer timer;
        

        public void StartGame(int a)
        {
            /*var canv = document.getElementById("gc" + a);
            var ctx = canv.getContext("2d");*/
            Reset(a); /*this.Reset(canv,ctx,a);*/
            

        }

        public void Reset(int a)
        {
            px = 10;
            py = 10;
            gs = 20;
            tc = 20;
            aliveTime = 2800; // To prevent the snake goes into a loop.
            vx = 0;
            vy = 0; // set initial x-y velocity of the snake
            /*this.trail = [];*/
            tail = 3; //intial length of the snake
            
            distance = 0;
            newDistance = 0;
            oldDistance = 0;
            score = 0; /*this.score=0;*/
            die = 0;/*this.die=0;*/
            //set initial x-y cordinate of the apple
            /*var randomX = Math.floor(Math.random() * this.tc);
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
                this.ay = randomY;*/

            /*ctx.fillStyle = "black"; // set background color
            ctx.fillRect(0, 0, canv.width, canv.height);

            ctx.fillStyle = "green";
            for (var i = 0; i < this.trail.length; i++)
            {
                ctx.fillRect(this.trail[i].x * this.gs, this.trail[i].y * this.gs, this.gs - 2, this.gs - 2);
            }

            ctx.fillStyle = "red";
            ctx.fillRect(this.ax * this.gs, this.ay * this.gs, this.gs - 2, this.gs - 2);
            */
        }

        public void Game(int a)
        {
            aliveTime -= 25;
            score += 0.25f;
            px += vx;
            py += vy;
            if (px < 0 || px > tc - 1 || py < 0 || py > tc - 1)
            { // if snake is out of left bound px = tc-1;
                die = 1;
                timer.Change(Timeout.Infinite, Timeout.Infinite);
                
            }

            /*ctx.fillStyle = "black"; // set background color
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
		    }*/

            if (ax == px && ay == py) // if position of snake is at the apple
            { 
                tail++; // it grows 1 size
                score += 10;
                /*this.aliveTime += 2500;*/ 
                // then apple position appears randomly elsewhere
                /*var randomX = Math.floor(Math.random() * this.tc);
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
                this.ay = randomY;*/
            }
            
            /*this.distance = Math.sqrt(Math.pow((this.ax - this.px), 2) + Math.pow((this.ay - this.py), 2));*/
            newDistance = distance;
            //if the snake moves away from the apple, it loses point
            if (newDistance > oldDistance)
            {
                score -= 1.5f;
            }
            else { score += 1f; }
            oldDistance = distance;
            /*if (this.aliveTime <= 0.0){ this.die = 1; this.timer.Change(-1,-1); }*/
            /*ctx.fillStyle = "red";
            ctx.fillRect(this.ax * this.gs, this.ay * this.gs, this.gs - 2, this.gs - 2);*/



        }

        public float[] GetInput()
        {
            wallUp = 1 - py/(tc - 1);
            wallDown = py / (tc - 1);
            wallLeft = 1 - px / (tc - 1);
            wallRight = px / (tc - 1);

            //Calculate distance from head to food in 4 directions Up, Down, Left, Right
            var minUp = tc - 1;
            var minDown = tc - 1;
            var minLeft = tc - 1;
            var minRight = tc - 1;


            /*if (this.ax == this.px)
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
            }*/

            //Normalize data: squeeze data between 0 (far) and 1 (close). 
            foodUp = 1 - minDown / (tc - 1); 
            foodDown = 1 - minUp / (tc - 1);
            foodLeft = 1 - minRight / (tc - 1);
            foodRight = 1 - minLeft / (tc - 1);





            //Calculate distance from head to body in 4 directions
            //Reset the vars
            minUp = tc - 1;
            minDown = tc - 1;
            minLeft = tc - 1;
            minRight = tc - 1;

            /*for (var i = 0; i < this.trail.length - 1; i++)
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

            }*/


            //Normalize data: squeeze data between 0 and 1
            bodyUp = 1 - minDown / (tc - 1);
            bodyDown = 1 - minUp / (tc - 1);
            bodyLeft = 1 - minRight / (tc - 1);
            bodyRight = 1 - minLeft / (tc - 1);
           
            
            inputList.Clear();

            inputList.Add(wallUp);
            inputList.Add(wallDown);
            inputList.Add(wallLeft);
            inputList.Add(wallRight);
            inputList.Add(bodyUp);
            inputList.Add(bodyDown);
            inputList.Add(bodyLeft);
            inputList.Add(bodyRight);
            inputList.Add(foodUp);
            inputList.Add(foodDown);
            inputList.Add(foodLeft);
            inputList.Add(foodRight);
            float[] inputs = inputList.ToArray(); //12 input neurons
           

            return inputs;


        }

        public void Decision(NeuralNetwork member)
        {
            float[] outputs = member.FeedFoward(GetInput()); //get output neurons from the network
            float maxValue = outputs.Max();
            int maxIndex = outputs.ToList().IndexOf(maxValue);

            switch (maxIndex)
            {
                case 0:
                    //Turn left
                    if (vx == 1)
                    { // if snake is heading right
                    } // do nothing. This prevents the snake moves backward. Do the same for other keys.
                    else
                    {
                        vx = -1;
                        vy = 0;
                    }
                    break;
                case 1:
                    //Turn right
                    if (vx == -1)
                    {
                    }
                    else
                    {
                        vx = 1;
                        vy = 0;
                    }
                    break;
                case 2:
                    //Turn down
                    if (vy == 1)
                    {
                    }
                    else
                    {
                        vx = 0;
                        vy = -1;
                    }
                    break;
                case 3:
                    //Turn up
                    if (vy == -1)
                    {
                    }
                    else
                    {
                        vx = 0;
                        vy = 1;
                    }
                    break;
            }
        }

        public void LoopGame(int a, NeuralNetwork member, float ms)
        {
            var startTimeSpan = TimeSpan.Zero;
            var periodTimeSpan = TimeSpan.FromMilliseconds(ms);
            /*var canv = document.getElementById("gc" + a);
            var ctx = canv.getContext("2d");*/

            timer = new Timer((e) =>
            {
                Game(a);/*this.Game(canv,ctx,a)*/
                Decision(member);
            }, null, startTimeSpan, periodTimeSpan);

            
        }
    }

}
