package jTest;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class Java8 {
	public static class Testando {
		public static boolean inferiorTo10(Integer val) {
			return val < 10;
		}
	}

	public static void main(String[] args) {

		List<Integer> list = Arrays.asList(1, 2, 4, 5);

		System.out.println(list.stream().allMatch(Java8::isTretas));

		List<Martelo> martelos = Arrays.asList(
				new Martelo("ola1", 1, Arrays.asList(4 , 7)),
				new Martelo("ola2", 2), 
				new Martelo("ola1", 3, Arrays.asList(1 , 2)), 
				new Martelo("ola1", 4)
		);

		martelos.stream()
				.peek(item -> System.out.println("Initial item: " + item))
				.map(Martelo::getOla)
				.peek(item -> System.out.println("Transformed item: " + item))
				.collect(Collectors.groupingBy(Function.identity(), Collectors.counting()))
				.forEach((groupKey, count) -> System.out.println(String.format("Group %s has %d elements", groupKey, count)));

		System.out.println("\nExcept example");
		List<Integer> list2 = Arrays.asList(2);
		list.stream().filter(((Predicate<Integer>) list2::contains).negate()).forEach(System.out::println);;

		System.out.println("\nIntersection example");
		list.stream().filter(list2::contains).forEach(System.out::println);
		
		System.out.println("\nFlattening them lists");
		martelos.stream()
				.flatMap(c -> c.getInts().stream())
				.sorted(Comparator.reverseOrder())
				.forEach(System.out::println);
		
		//
		//
		//
		// StopWatch sw = new StopWatch("asdas");
		//
		// int[] intList = new Random().ints(100000, 0, 10).toArray();
		//
		// List<Integer> list = new ArrayList<Integer>();
		// for (int integer2 : intList) {
		// list.add(new Integer(integer2));
		// }
		//
		// sw.start("Normal");
		// System.out.println("\n\n--- Starting Normal ---");
		// List<Integer> multipliedInts = new ArrayList<Integer>();
		// for (Integer integer : list) {
		// multipliedInts.add(integer * integer);
		// }
		//
		// Map<Integer, Long> groupedBy = new HashMap<Integer, Long>();
		//
		// for (Integer integer : multipliedInts) {
		// groupedBy.put(integer, (groupedBy.containsKey(integer)) ?
		// groupedBy.get(integer) + 1 : 1);
		// }
		//
		// for (Map.Entry<Integer, Long> groupedKey : groupedBy.entrySet()) {
		// System.out.println(String.format(
		// "Group %s has %d elements", groupedKey.getKey(),
		// groupedKey.getValue()));
		// }
		//
		// sw.stop();
		//
		// sw.start("Lambda");
		// System.out.println("\n\n--- Starting Lambda ---");
		// list.parallelStream()
		// .map(item -> item * item)
		// .collect(
		// Collectors.groupingBy(Function.identity(),
		// Collectors.counting()))
		// .forEach(
		// (groupKey, count) -> System.out.println(String.format(
		// "Group %s has %d elements", groupKey, count)));
		//
		//
		// sw.stop();
		//
		//
		//
		// System.out.println("\n\n" + sw.prettyPrint());
		//

	}

	private static boolean isTretas(Integer x) {
		return x instanceof Integer;
	}

}
