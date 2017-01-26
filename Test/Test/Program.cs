﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test
{
    class Program
    {
        /// <summary>
        /// https://codility.com/programmers/lessons/1-iterations/binary_gap/
        /// </summary>
        /// <param name="N"></param>
        /// <returns></returns>
        public static int BinaryGap_1(int N)
        {
            string binary = Convert.ToString(N, 2);

            Console.WriteLine("Binary: " + binary);

            if (binary.Count(x => x == '1') <= 1) return 0;

            binary = binary.Substring(binary.IndexOf('1'), binary.LastIndexOf("1") - binary.IndexOf('1'));

            return binary.Split('1').Max(x => x.Length);
        }

        /// <summary>
        /// https://codility.com/programmers/lessons/1-iterations/binary_gap/
        /// </summary>
        /// <param name="N"></param>
        /// <returns></returns>
        public static int BinaryGap_2(int N)
        {
            string binary = Convert.ToString(N, 2);

            Console.WriteLine("Binary: " + binary);

            var maxGap = 0;
            var previousOnePosition = -1;
            for (var i = 0; i < binary.Length; i++)
            {
                if (binary[i] == '1')
                {
                    if (previousOnePosition == -1)
                    {
                        previousOnePosition = i;
                        continue;
                    }

                    var currentGap = (i - previousOnePosition) - 1;
                    if (currentGap > maxGap)
                    {
                        maxGap = currentGap;
                    }

                    previousOnePosition = i;
                }
            }

            return maxGap;
        }

        /// <summary>
        /// https://codility.com/programmers/lessons/2-arrays/odd_occurrences_in_array/
        /// </summary>
        /// <param name="A"></param>
        /// <returns></returns>
        public static int OddOccurrencesInArray(int[] A)
        {
            return A.GroupBy(x => x).First(group => group.Count() % 2 != 0).Key;
        }

        /// <summary>
        /// https://codility.com/programmers/lessons/2-arrays/cyclic_rotation/
        /// </summary>
        /// <param name="A"></param>
        /// <param name="K"></param>
        /// <returns></returns>
        public static int[] CyclicRotation(int[] A, int K)
        {
            if (A == null || A.Length <= 1) return A;

            var list = A.ToList();

            Enumerable.Range(0, K).ToList().ForEach(x =>
            {
                list.Insert(0, list.Last());
                list.RemoveAt(list.Count - 1);
            });

            return list.ToArray();
        }

        static void Main(string[] args)
        {
            Console.WriteLine(String.Join(",", CyclicRotation(new int[] { 42, 1, 3, 5 }, 2)));
            Console.ReadKey();
        }
    }
}
