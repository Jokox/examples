using System;
using System.Collections;
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
        public static int permMissingElem_1(int[] A)
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

        /// <summary>
        /// https://codility.com/programmers/lessons/3-time_complexity/perm_missing_elem/
        /// </summary>
        /// <param name="A"></param>
        /// <returns></returns>
        public static int permMissingElem_2(int[] A)
        {
            if (A.Length == 0) return 1;

            return Enumerable.Range(1, A.Length + 1).Except(A.OrderBy(x => x)).First();
        }

        /// <summary>
        /// https://codility.com/programmers/lessons/3-time_complexity/tape_equilibrium/
        /// </summary>
        /// <param name="A"></param>
        /// <returns></returns>
        public static int tapeEquilibrium_1(int[] A)
        {
            var minDiff = int.MaxValue;
            var left = 0;
            var right = A.Sum();

            for (var i = 1; i < A.Length; i++)
            {
                left += A[i - 1];
                right -= A[i - 1];

                var diff = Math.Abs(right - left);

                if (diff < minDiff) minDiff = diff;
            }

            return minDiff;
        }

        /// <summary>
        /// https://codility.com/programmers/lessons/4-counting_elements/missing_integer/
        /// </summary>
        /// <param name="A"></param>
        /// <returns></returns>
        public static int missingInteger(int[] A)
        {
            var list = A.Where(x => x > 0);

            if (list.Count() == 0) return 1;

            var missing = Enumerable.Range(1, list.Max()).Except(list);

            return missing.DefaultIfEmpty(list.Max() + 1).First();
        }
        
        /// <summary>
        /// https://codility.com/programmers/lessons/4-counting_elements/perm_check/
        /// </summary>
        /// <param name="A"></param>
        /// <returns></returns>
        public static int permCheck(int[] A)
        {
            if (A.Count() < 1 || A.Count() > 100000) return 0; // N is an integer within the range [1..100,000];

            var arr = A.OrderBy(x => x);
            var size = arr.Count();

            var firstElem = arr.ElementAt(0);

            if (firstElem != 1) return 0;

            if (arr.Distinct().Count() != size) return 0;

            return ((arr.ElementAt(size - 1) - firstElem + 1) == size) ? 1 : 0; 
        }
        
         /// <summary>
        /// https://codility.com/programmers/lessons/4-counting_elements/frog_river_one/
        /// 
        /// 0% perfomance
        /// </summary>
        /// <param name="X"></param>
        /// <param name="A"></param>
        /// <returns></returns>
        public static int frogRiverOne_1(int X, int[] A)
        {
            if (X < 1 || X > 100000) return -1; // N and X are integers within the range [1..100,000];

            var arrBit = new BitArray(X);
            for (var i = 0; i < A.Count(); i++)
            {
                arrBit.Set(A[i] - 1, true);

                if (arrBit.Cast<bool>().All(x => x)) return i;
            }

            return -1;
        }

        /// <summary>
        /// https://codility.com/programmers/lessons/4-counting_elements/frog_river_one/
        /// </summary>
        /// <param name="X"></param>
        /// <param name="A"></param>
        /// <returns></returns>
        public static int frogRiverOne_2(int X, int[] A)
        {
            if (X < 1 || X > 100000) return -1; // N and X are integers within the range [1..100,000];

            Dictionary<int, bool> map = new Dictionary<int, bool>();

            for (var i = 0; i < A.Count(); i++)
            {
                var value = A[i];
                if (1 <= value && value <= X && !map.ContainsKey(value)) map.Add(value, true);

                if (map.Count == X) return i;
            }

            return -1;
        }
        
        /// <summary>
        /// https://codility.com/programmers/lessons/5-prefix_sums/count_div/
        /// 0% perfomance
        /// </summary>
        /// <param name="A"></param>
        /// <param name="B"></param>
        /// <param name="K"></param>
        /// <returns></returns>
        public static int countDiv_1(int A, int B, int K)
        {
            if (K < 1 || K > 2000000000) return 0; // A and B are integers within the range [0..2,000,000,000];

            if (A < 0 || A > 2000000000) return 0; // K is an integer within the range [1..2,000,000,000]

            if (A > B) return 0; // A ≤ B

            return Enumerable.Range(A, (B - A) + 1).Count(x => x % K == 0);
        }

        /// <summary>
        /// https://codility.com/programmers/lessons/5-prefix_sums/count_div/
        /// /// 0% perfomance
        /// </summary>
        /// <param name="A"></param>
        /// <param name="B"></param>
        /// <param name="K"></param>
        /// <returns></returns>
        public static int countDiv_2(int A, int B, int K)
        {
            if (K < 1 || K > 2000000000) return 0; // A and B are integers within the range [0..2,000,000,000];

            if (A < 0 || A > 2000000000) return 0; // K is an integer within the range [1..2,000,000,000]

            if (A > B) return 0; // A ≤ B

            var count = 0;
            for (var i = A; i <= B; i++)
            {
                if (i % K == 0) count++;
            }

            return count;
        }
        
        /// <summary>
        /// https://codility.com/programmers/lessons/5-prefix_sums/count_div/
        /// </summary>
        /// <param name="A"></param>
        /// <param name="B"></param>
        /// <param name="K"></param>
        /// <returns></returns>
        public static int countDiv_3(int A, int B, int K)
        {
            if (K < 1 || K > 2000000000) return 0; // A and B are integers within the range [0..2,000,000,000];

            if (A < 0 || A > 2000000000) return 0; // K is an integer within the range [1..2,000,000,000]

            if (A > B) return 0; // A ≤ B

            if (A == B) return (A % K == 0) ? 1 : 0;

            var divs = (B / K) - (A / K);

            if (A % K == 0) divs++;

            return divs;
        }
        
        /// <summary>
        /// https://codility.com/programmers/lessons/5-prefix_sums/passing_cars/
        /// </summary>
        /// <param name="X"></param>
        /// <param name="A"></param>
        /// <returns></returns>
        public static int passingCars(int[] A)
        {
            if (A.Length < 1 || A.Length > 100000) return -1; // N and X are integers within the range [1..100,000];

            var countOnesPassed = 0;
            var count = 0;
            for (var i = A.Length - 1; i >= 0; i--)
            {
                var elem = A[i];

                if (elem == 0) count += countOnesPassed;

                if (elem == 1) countOnesPassed++;

                if (count > 1000000000) return -1;
            }

            return count;
        }
        
        /// <summary>
        /// https://codility.com/programmers/lessons/5-prefix_sums/genomic_range_query/
        /// 0% perfomance
        /// </summary>
        /// <param name="X"></param>
        /// <param name="A"></param>
        /// <returns></returns>
        public static int[] genomicRangeQuery_1(string S, int[] P, int[] Q)
        {
            if (S.Length < 1 || S.Length > 100000) return null; // S length is within the range [1..100,000];

            if (P.Length != Q.Length) return null; // Query params length must match

            var queriesNumber = P.Length;

            return Enumerable.Range(0, queriesNumber).Select(x => {
                var queryStr = S.Substring(P[x], Q[x] - P[x] + 1);

                if (queryStr.Contains('A')) return 1;
                if (queryStr.Contains('C')) return 2;
                if (queryStr.Contains('G')) return 3;
                if (queryStr.Contains('T')) return 4;

                return 0;
            }).ToArray();
        }

        /// <summary>
        /// https://codility.com/programmers/lessons/5-prefix_sums/genomic_range_query/
        /// 0% perfomance
        /// </summary>
        /// <param name="X"></param>
        /// <param name="A"></param>
        /// <returns></returns>
        public static int[] genomicRangeQuery_2(string S, int[] P, int[] Q)
        {
            if (S.Length < 1 || S.Length > 100000) return null; // S length is within the range [1..100,000];

            if (P.Length != Q.Length) return null; // Query params length must match

            var queriesNumber = P.Length;
            var queriesResult = new int[queriesNumber];
            for (var i = 0; i < queriesNumber; i++)
            {
                var queryStr = S.Substring(P[i], Q[i] - P[i] + 1);

                if (queryStr.Contains('A')) { queriesResult[i] = 1; continue; }
                if (queryStr.Contains('C')) { queriesResult[i] = 2; continue; }
                if (queryStr.Contains('G')) { queriesResult[i] = 3; continue; }
                if (queryStr.Contains('T')) { queriesResult[i] = 4; continue; }
            }

            return queriesResult;
        }
        
        /// <summary>
        /// https://codility.com/programmers/lessons/6-sorting/distinct/
        /// </summary>
        /// <param name="A"></param>
        /// <returns></returns>
        public static int distinct(int[] A)
        {
            if (A == null) return 0;

            return A.Distinct().Count();
        }

        /// <summary>
        /// https://codility.com/programmers/lessons/8-leader/dominator/
        /// </summary>
        /// <param name="A"></param>
        /// <returns></returns>
        public static int dominator(int[] A)
        {
            if (A.Length == 0) return -1; // A mustn't be empty

            var groups = A.GroupBy(x => x);
            var maxCount = groups.Max(x => x.Count());

            if (groups.Count(x => x.Count() == maxCount) > 1) return -1; // Dominator must occur more then half array size

            if(maxCount <= A.Length / 2d) return -1;

            var dominator = groups.First(x => x.Count() == maxCount).Key;

            return A.ToList().IndexOf(dominator);
        }
        
        static void Main(string[] args)
        {
            Console.WriteLine(missingInteger(new int[] { 1, 2, 4 }));
            Console.ReadKey();
        }
    }
}
