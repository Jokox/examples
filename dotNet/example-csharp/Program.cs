using System;
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
        public static int binaryGap_1(int N)
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
        public static int binaryGap_2(int N)
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
        public static int oddOccurrencesInArray(int[] A)
        {
            return A.GroupBy(x => x).First(group => group.Count() % 2 != 0).Key;
        }

        /// <summary>
        /// https://codility.com/programmers/lessons/2-arrays/cyclic_rotation/
        /// </summary>
        /// <param name="A"></param>
        /// <param name="K"></param>
        /// <returns></returns>
        public static int[] cyclicRotation(int[] A, int K)
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

        /// <summary>
        /// https://codility.com/programmers/lessons/3-time_complexity/frog_jmp/
        /// </summary>
        /// <param name="X"></param>
        /// <param name="Y"></param>
        /// <param name="D"></param>
        /// <returns></returns>
        public static int frogJmp(int X, int Y, int D)
        {
            return (int) Math.Ceiling((double)(Y - X) / (double)D);
        }

        /// <summary>
        /// https://codility.com/programmers/lessons/3-time_complexity/perm_missing_elem/
        /// </summary>
        /// <param name="A"></param>
        /// <returns></returns>
        public static int permMissingElem(int[] A)
        {
            long size = A.Length;

            if (size == 0)
            {
                return 1;
            }
            else if (size == 1 && A[0] == 1)
            {
                return 2;
            }

            long total = (size * (size + 1)) / 2;

            var i = 0;
            for (; i < size; i++)
            {
                if (A[i] <= size)
                {
                    total -= ((long) A[i]);
                }
            }
            return (total == 0) ? i + 1 : (int) total;
        }

        static void Main(string[] args)
        {
            Console.WriteLine(permMissingElem(new int[] { 1, 2, 6, 3, 4 }));
            Console.ReadKey();
        }
    }
}
