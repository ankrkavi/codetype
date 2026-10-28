import { Exercise } from '../types';

export const JAVA_EXERCISES: Exercise[] = [
  // ================= A. JAVA FUNDAMENTALS =================
  {
    id: 'java-fund-01',
    title: 'Hello World and Main Entry Method',
    language: 'java',
    mainTopic: 'java-fundamentals',
    subtopic: 'Hello World & Main Entry',
    difficulty: 'beginner',
    statement: 'Define the standard Java public static void main execution entry point and print to console.',
    concepts: ['public static void main', 'System.out.println', 'String[] args'],
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to CodeType Java practice!");
        System.out.println("Think in code. Type with flow.");
    }
}`,
    estimatedDuration: '25s',
    codeLength: 'short',
    tags: ['basics', 'main', 'println']
  },
  {
    id: 'java-fund-02',
    title: 'Primitive Types and Wrapper Conversions',
    language: 'java',
    mainTopic: 'java-fundamentals',
    subtopic: 'Variables & Primitives',
    difficulty: 'beginner',
    statement: 'Initialize primitive types and perform standard boxing/unboxing with Integer and Double wrappers.',
    concepts: ['primitives', 'autoboxing', 'unboxing', 'wrappers'],
    code: `public class PrimitivesDemo {
    public static void main(String[] args) {
        int primitiveCount = 42;
        Integer boxedCount = Integer.valueOf(primitiveCount);
        double accuracy = 99.4;
        boolean isVerified = true;

        System.out.printf("Count: %d, Accuracy: %.1f%%, Active: %b%n",
            boxedCount, accuracy, isVerified);
    }
}`,
    estimatedDuration: '40s',
    codeLength: 'short',
    tags: ['primitives', 'boxing', 'formatting']
  },
  {
    id: 'java-fund-03',
    title: 'Scanner Standard Input Reading',
    language: 'java',
    mainTopic: 'java-fundamentals',
    subtopic: 'Scanner Input & System Output',
    difficulty: 'beginner',
    statement: 'Read tokens and numbers safely from standard input using java.util.Scanner.',
    concepts: ['java.util.Scanner', 'System.in', 'try-with-resources'],
    code: `import java.util.Scanner;

public class InputReader {
    public static int readSum() {
        try (Scanner scanner = new Scanner(System.in)) {
            int a = scanner.nextInt();
            int b = scanner.nextInt();
            return a + b;
        }
    }
}`,
    estimatedDuration: '35s',
    codeLength: 'short',
    tags: ['scanner', 'input', 'try-with-resources']
  },
  {
    id: 'java-fund-04',
    title: 'Modern Switch Expression with Arrow Syntax',
    language: 'java',
    mainTopic: 'java-fundamentals',
    subtopic: 'Conditionals & Switch Expressions',
    difficulty: 'easy',
    statement: 'Use modern Java switch expressions with arrow syntax returning direct computed values.',
    concepts: ['switch expression', 'arrow syntax ->', 'exhaustiveness'],
    code: `public class DayClassifier {
    public static String getCategory(int dayOfWeek) {
        return switch (dayOfWeek) {
            case 1, 7 -> "Weekend";
            case 2, 3, 4, 5, 6 -> "Weekday";
            default -> throw new IllegalArgumentException("Invalid day: " + dayOfWeek);
        };
    }
}`,
    estimatedDuration: '40s',
    codeLength: 'short',
    tags: ['switch', 'modern-java', 'syntax']
  },
  {
    id: 'java-fund-05',
    title: 'Enhanced For-Each and Array Traversal',
    language: 'java',
    mainTopic: 'java-fundamentals',
    subtopic: 'Loops & Enhanced For-Each',
    difficulty: 'beginner',
    statement: 'Iterate over an integer array using the enhanced for-each loop to calculate running statistics.',
    concepts: ['enhanced for', 'for-each', 'array indexing', 'length'],
    code: `public class ArrayStatistics {
    public static double computeAverage(int[] scores) {
        if (scores == null || scores.length == 0) return 0.0;
        long sum = 0;
        for (int score : scores) {
            sum += score;
        }
        return (double) sum / scores.length;
    }
}`,
    estimatedDuration: '35s',
    codeLength: 'short',
    tags: ['for-each', 'arrays', 'loops']
  },
  {
    id: 'java-fund-06',
    title: 'StringBuilder Efficient String Construction',
    language: 'java',
    mainTopic: 'java-fundamentals',
    subtopic: 'String & StringBuilder',
    difficulty: 'easy',
    statement: 'Construct formatted concatenated strings efficiently without creating intermediate immutable strings.',
    concepts: ['StringBuilder', 'append()', 'immutability', 'toString()'],
    code: `public class StringFormatter {
    public static String joinTokens(String[] tokens, String delimiter) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < tokens.length; i++) {
            sb.append(tokens[i]);
            if (i < tokens.length - 1) {
                sb.append(delimiter);
            }
        }
        return sb.toString();
    }
}`,
    estimatedDuration: '45s',
    codeLength: 'short',
    tags: ['stringbuilder', 'strings', 'performance']
  },
  {
    id: 'java-fund-07',
    title: 'Method Overloading and Varargs',
    language: 'java',
    mainTopic: 'java-fundamentals',
    subtopic: 'Wrapper Classes & Varargs',
    difficulty: 'easy',
    statement: 'Implement variable-argument methods that accept variable numbers of integer parameters.',
    concepts: ['varargs int...', 'method overloading', 'parameter arrays'],
    code: `public class MathHelper {
    public static int sum(int... values) {
        int total = 0;
        for (int v : values) {
            total += v;
        }
        return total;
    }

    public static double sum(double... values) {
        double total = 0.0;
        for (double v : values) {
            total += v;
        }
        return total;
    }
}`,
    estimatedDuration: '45s',
    codeLength: 'short',
    tags: ['varargs', 'overloading', 'methods']
  },

  // ================= B. OBJECT-ORIENTED PROGRAMMING =================
  {
    id: 'java-oop-01',
    title: 'Class with Encapsulation and Invariant Validation',
    language: 'java',
    mainTopic: 'java-oop',
    subtopic: 'Classes & Constructors',
    difficulty: 'easy',
    statement: 'Design an encapsulated BankAccount class with validation invariants and private fields.',
    concepts: ['encapsulation', 'private fields', 'getters/setters', 'validation'],
    code: `public class BankAccount {
    private final String accountNumber;
    private double balance;

    public BankAccount(String accountNumber, double initialBalance) {
        if (initialBalance < 0) {
            throw new IllegalArgumentException("Initial balance cannot be negative");
        }
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    public synchronized void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    public double getBalance() {
        return balance;
    }
}`,
    estimatedDuration: '55s',
    codeLength: 'medium',
    tags: ['oop', 'encapsulation', 'classes']
  },
  {
    id: 'java-oop-02',
    title: 'Inheritance and super Method Invocation',
    language: 'java',
    mainTopic: 'java-oop',
    subtopic: 'Inheritance & Method Overriding',
    difficulty: 'easy',
    statement: 'Extend a base Employee class and invoke super constructors and overridden description methods.',
    concepts: ['extends', 'super()', 'method overriding', '@Override'],
    code: `public class Employee {
    protected final String name;
    protected final double baseSalary;

    public Employee(String name, double baseSalary) {
        this.name = name;
        this.baseSalary = baseSalary;
    }

    public double calculatePay() {
        return baseSalary;
    }
}

class Manager extends Employee {
    private final double bonus;

    public Manager(String name, double baseSalary, double bonus) {
        super(name, baseSalary);
        this.bonus = bonus;
    }

    @Override
    public double calculatePay() {
        return super.calculatePay() + bonus;
    }
}`,
    estimatedDuration: '65s',
    codeLength: 'medium',
    tags: ['inheritance', 'super', 'override']
  },
  {
    id: 'java-oop-03',
    title: 'Abstract Class Shape with Derived Areas',
    language: 'java',
    mainTopic: 'java-oop',
    subtopic: 'Abstract Classes & Interfaces',
    difficulty: 'medium',
    statement: 'Define an abstract base Shape class declaring contract methods implemented by concrete classes.',
    concepts: ['abstract class', 'abstract method', 'polymorphism'],
    code: `public abstract class Shape {
    public abstract double getArea();
    public abstract double getPerimeter();
}

class Rectangle extends Shape {
    private final double width, height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public double getArea() { return width * height; }

    @Override
    public double getPerimeter() { return 2 * (width + height); }
}`,
    estimatedDuration: '55s',
    codeLength: 'medium',
    tags: ['abstract', 'oop', 'polymorphism']
  },
  {
    id: 'java-oop-04',
    title: 'Interface Segregation with Default Methods',
    language: 'java',
    mainTopic: 'java-oop',
    subtopic: 'Abstract Classes & Interfaces',
    difficulty: 'easy',
    statement: 'Declare a functional interface with contract signatures and a default helper method.',
    concepts: ['interface', 'default method', 'implements'],
    code: `public interface Auditable {
    String getAuditId();
    long getCreatedAtTimestamp();

    default boolean isExpired(long currentTimestamp, long maxAgeMs) {
        return (currentTimestamp - getCreatedAtTimestamp()) > maxAgeMs;
    }
}`,
    estimatedDuration: '35s',
    codeLength: 'short',
    tags: ['interface', 'default-methods', 'contracts']
  },
  {
    id: 'java-oop-05',
    title: 'Overriding equals and hashCode Contract',
    language: 'java',
    mainTopic: 'java-oop',
    subtopic: 'Object Methods (equals, hashCode)',
    difficulty: 'medium',
    statement: 'Fulfill the Java equals and hashCode contract using java.util.Objects utility methods.',
    concepts: ['equals', 'hashCode', 'Objects.equals', 'type check'],
    code: `import java.util.Objects;

public final class Coordinate {
    private final int x;
    private final int y;

    public Coordinate(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Coordinate other)) return false;
        return this.x == other.x && this.y == other.y;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y);
    }
}`,
    estimatedDuration: '55s',
    codeLength: 'medium',
    tags: ['equals', 'hashcode', 'objects']
  },
  {
    id: 'java-oop-06',
    title: 'Custom Checked Exception Handling',
    language: 'java',
    mainTopic: 'java-oop',
    subtopic: 'Exception Handling & Custom Exceptions',
    difficulty: 'easy',
    statement: 'Define a custom business domain exception inheriting from Exception and throw with cause.',
    concepts: ['custom exception', 'throws', 'throw', 'Exception'],
    code: `public class InsufficientFundsException extends Exception {
    private final double attemptedAmount;

    public InsufficientFundsException(String message, double amount) {
        super(message);
        this.attemptedAmount = amount;
    }

    public double getAttemptedAmount() {
        return attemptedAmount;
    }
}`,
    estimatedDuration: '40s',
    codeLength: 'short',
    tags: ['exceptions', 'checked', 'oop']
  },

  // ================= C. JAVA COLLECTIONS FRAMEWORK =================
  {
    id: 'java-coll-01',
    title: 'ArrayList Filtering and Transformation',
    language: 'java',
    mainTopic: 'java-collections',
    subtopic: 'ArrayList & Dynamic Lists',
    difficulty: 'easy',
    statement: 'Filter and transform standard ArrayList elements using traditional indexed and for-each access.',
    concepts: ['ArrayList', 'List', 'add', 'get', 'size'],
    code: `import java.util.ArrayList;
import java.util.List;

public class ListFilter {
    public static List<String> filterPrefix(List<String> items, String prefix) {
        List<String> result = new ArrayList<>();
        for (String item : items) {
            if (item != null && item.startsWith(prefix)) {
                result.add(item.toUpperCase());
            }
        }
        return result;
    }
}`,
    estimatedDuration: '45s',
    codeLength: 'short',
    tags: ['arraylist', 'collections', 'filtering']
  },
  {
    id: 'java-coll-02',
    title: 'ArrayDeque as High-Speed LIFO Stack',
    language: 'java',
    mainTopic: 'java-collections',
    subtopic: 'ArrayDeque & PriorityQueue',
    difficulty: 'easy',
    statement: 'Use ArrayDeque as the modern, non-synchronized replacement for legacy java.util.Stack.',
    concepts: ['ArrayDeque', 'Deque', 'push', 'pop', 'peek'],
    code: `import java.util.ArrayDeque;
import java.util.Deque;

public class DequeStack<T> {
    private final Deque<T> stack = new ArrayDeque<>();

    public void push(T item) {
        stack.push(item);
    }

    public T pop() {
        return stack.pop();
    }

    public boolean isEmpty() {
        return stack.isEmpty();
    }
}`,
    estimatedDuration: '45s',
    codeLength: 'short',
    tags: ['deque', 'arraydeque', 'stack']
  },
  {
    id: 'java-coll-03',
    title: 'PriorityQueue Min-Heap and Max-Heap',
    language: 'java',
    mainTopic: 'java-collections',
    subtopic: 'ArrayDeque & PriorityQueue',
    difficulty: 'medium',
    statement: 'Instantiate a priority queue with custom Comparator ordering reversing natural sort order.',
    concepts: ['PriorityQueue', 'Comparator.reverseOrder', 'heap', 'offer/poll'],
    code: `import java.util.Collections;
import java.util.PriorityQueue;

public class MaxHeapStream {
    public static PriorityQueue<Integer> createMaxHeap(int[] values) {
        PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
        for (int v : values) {
            pq.offer(v);
        }
        return pq;
    }
}`,
    estimatedDuration: '40s',
    codeLength: 'short',
    tags: ['priorityqueue', 'heap', 'comparator']
  },
  {
    id: 'java-coll-04',
    title: 'HashMap Word Frequency Counter',
    language: 'java',
    mainTopic: 'java-collections',
    subtopic: 'HashMap & LinkedHashMap',
    difficulty: 'easy',
    statement: 'Count occurrences of words using Map.getOrDefault in O(N) linear time.',
    concepts: ['HashMap', 'Map', 'getOrDefault', 'put'],
    code: `import java.util.HashMap;
import java.util.Map;

public class WordFrequency {
    public static Map<String, Integer> countWords(String[] words) {
        Map<String, Integer> frequencyMap = new HashMap<>();
        for (String word : words) {
            frequencyMap.put(word, frequencyMap.getOrDefault(word, 0) + 1);
        }
        return frequencyMap;
    }
}`,
    estimatedDuration: '35s',
    codeLength: 'short',
    tags: ['hashmap', 'frequency', 'collections']
  },
  {
    id: 'java-coll-05',
    title: 'Custom Comparator Chaining',
    language: 'java',
    mainTopic: 'java-collections',
    subtopic: 'Comparable & Comparator',
    difficulty: 'medium',
    statement: 'Chain multiple sorting criteria using modern Comparator comparing and thenComparing methods.',
    concepts: ['Comparator.comparing', 'thenComparing', 'lambda', 'sorting'],
    code: `import java.util.Comparator;
import java.util.List;

public class PlayerSorter {
    public record Player(String name, int score, int age) {}

    public static void sortPlayers(List<Player> players) {
        players.sort(
            Comparator.comparingInt(Player::score).reversed()
                .thenComparing(Player::name)
        );
    }
}`,
    estimatedDuration: '45s',
    codeLength: 'short',
    tags: ['comparator', 'records', 'sorting']
  },

  // ================= D. CORE JAVA CONCEPTS =================
  {
    id: 'java-core-01',
    title: 'Generic Type-Safe Pair Container',
    language: 'java',
    mainTopic: 'java-core-concepts',
    subtopic: 'Generics & Type Safety',
    difficulty: 'easy',
    statement: 'Implement an immutable generic container with two distinct type parameters.',
    concepts: ['generics <K, V>', 'type parameter', 'immutability'],
    code: `public final class Pair<K, V> {
    private final K first;
    private final V second;

    public Pair(K first, V second) {
        this.first = first;
        this.second = second;
    }

    public K getFirst() { return first; }
    public V getSecond() { return second; }
}`,
    estimatedDuration: '35s',
    codeLength: 'short',
    tags: ['generics', 'typesafety', 'pair']
  },
  {
    id: 'java-core-02',
    title: 'Functional Interface and Lambda Predicates',
    language: 'java',
    mainTopic: 'java-core-concepts',
    subtopic: 'Functional Interfaces & Lambdas',
    difficulty: 'easy',
    statement: 'Pass a java.util.function.Predicate lambda to filter collections conditionally.',
    concepts: ['@FunctionalInterface', 'Predicate<T>', 'test()', 'lambda'],
    code: `import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

public class PredicateFilter {
    public static <T> List<T> filterList(List<T> list, Predicate<T> condition) {
        List<T> filtered = new ArrayList<>();
        for (T item : list) {
            if (condition.test(item)) {
                filtered.add(item);
            }
        }
        return filtered;
    }
}`,
    estimatedDuration: '45s',
    codeLength: 'medium',
    tags: ['functional-interface', 'predicate', 'lambdas']
  },
  {
    id: 'java-core-03',
    title: 'Java 8 Stream Map, Filter, and Collect',
    language: 'java',
    mainTopic: 'java-core-concepts',
    subtopic: 'Java 8 Stream Pipeline',
    difficulty: 'medium',
    statement: 'Process and transform collections using a declarative Java 8 Stream pipeline.',
    concepts: ['stream()', 'filter', 'map', 'collect', 'Collectors.toList'],
    code: `import java.util.List;
import java.util.stream.Collectors;

public class StreamPipeline {
    public static List<Integer> processEvenSquares(List<Integer> numbers) {
        return numbers.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * n)
            .sorted()
            .collect(Collectors.toList());
    }
}`,
    estimatedDuration: '40s',
    codeLength: 'short',
    tags: ['streams', 'map', 'filter', 'collect']
  },
  {
    id: 'java-core-04',
    title: 'Thread-Safe Counter with AtomicInteger',
    language: 'java',
    mainTopic: 'java-core-concepts',
    subtopic: 'Synchronization & Locks',
    difficulty: 'easy',
    statement: 'Provide lock-free, atomic integer increments in multithreaded environments.',
    concepts: ['AtomicInteger', 'CAS', 'lock-free', 'thread safety'],
    code: `import java.util.concurrent.atomic.AtomicInteger;

public class SafeHitCounter {
    private final AtomicInteger hits = new AtomicInteger(0);

    public int increment() {
        return hits.incrementAndGet();
    }

    public int getCount() {
        return hits.get();
    }
}`,
    estimatedDuration: '30s',
    codeLength: 'short',
    tags: ['concurrency', 'atomic', 'thread-safety']
  },
  {
    id: 'java-core-05',
    title: 'ExecutorService Fixed Thread Pool',
    language: 'java',
    mainTopic: 'java-core-concepts',
    subtopic: 'ExecutorService & Concurrency',
    difficulty: 'medium',
    statement: 'Dispatch asynchronous tasks to a bounded ExecutorService thread pool with clean shutdown.',
    concepts: ['ExecutorService', 'Executors.newFixedThreadPool', 'Future', 'shutdown'],
    code: `import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class TaskPool {
    public static void runBatch(Runnable[] tasks) throws InterruptedException {
        ExecutorService executor = Executors.newFixedThreadPool(4);
        try {
            for (Runnable task : tasks) {
                executor.execute(task);
            }
        } finally {
            executor.shutdown();
            executor.awaitTermination(5, TimeUnit.SECONDS);
        }
    }
}`,
    estimatedDuration: '55s',
    codeLength: 'medium',
    tags: ['executorservice', 'concurrency', 'threads']
  },

  // ================= E. DATA STRUCTURES IN JAVA =================
  {
    id: 'java-dsa-01',
    title: 'Singly Linked List Node Reversal',
    language: 'java',
    mainTopic: 'java-data-structures',
    subtopic: 'Custom Linked List Nodes',
    difficulty: 'medium',
    statement: 'Reverse node links of a singly linked list iteratively in O(N) time and O(1) space.',
    concepts: ['linked list', 'pointers', 'iterative reversal'],
    code: `public class LinkedListReversal {
    public static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }

    public static ListNode reverse(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`,
    estimatedDuration: '55s',
    codeLength: 'medium',
    tags: ['linked-list', 'reversal', 'pointers']
  },
  {
    id: 'java-dsa-02',
    title: 'Binary Tree Level Order Traversal',
    language: 'java',
    mainTopic: 'java-data-structures',
    subtopic: 'Binary Trees & Level Traversal',
    difficulty: 'medium',
    statement: 'Traverse a binary tree tier-by-tier using a queue-based breadth-first algorithm.',
    concepts: ['binary tree', 'BFS', 'Queue', 'ArrayDeque'],
    code: `import java.util.*;

public class LevelOrderTraversal {
    public static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>();
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                currentLevel.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            result.add(currentLevel);
        }
        return result;
    }
}`,
    estimatedDuration: '75s',
    codeLength: 'long',
    tags: ['binary-tree', 'bfs', 'queue']
  },
  {
    id: 'java-dsa-03',
    title: 'Binary Search Tree Insertion',
    language: 'java',
    mainTopic: 'java-data-structures',
    subtopic: 'Binary Search Tree (BST)',
    difficulty: 'medium',
    statement: 'Insert integer keys recursively into a binary search tree preserving the BST ordering property.',
    concepts: ['BST', 'recursion', 'binary search tree'],
    code: `public class BSTInsert {
    public static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    public static TreeNode insert(TreeNode root, int val) {
        if (root == null) return new TreeNode(val);
        if (val < root.val) {
            root.left = insert(root.left, val);
        } else if (val > root.val) {
            root.right = insert(root.right, val);
        }
        return root;
    }
}`,
    estimatedDuration: '50s',
    codeLength: 'medium',
    tags: ['bst', 'trees', 'recursion']
  },
  {
    id: 'java-dsa-04',
    title: 'Trie Prefix Tree Implementation in Java',
    language: 'java',
    mainTopic: 'java-data-structures',
    subtopic: 'Trie Prefix Tree',
    difficulty: 'hard',
    statement: 'Implement an alphabet prefix tree supporting fast O(L) insertions and prefix lookups.',
    concepts: ['Trie', 'prefix tree', 'nodes', 'character indexing'],
    code: `public class Trie {
    private static class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean isEndOfWord = false;
    }

    private final TrieNode root = new TrieNode();

    public void insert(String word) {
        TrieNode current = root;
        for (char ch : word.toCharArray()) {
            int index = ch - 'a';
            if (current.children[index] == null) {
                current.children[index] = new TrieNode();
            }
            current = current.children[index];
        }
        current.isEndOfWord = true;
    }
}`,
    estimatedDuration: '65s',
    codeLength: 'medium',
    tags: ['trie', 'strings', 'dsa']
  },
  {
    id: 'java-dsa-05',
    title: 'Disjoint Set Union (Union-Find) with Ranks',
    language: 'java',
    mainTopic: 'java-data-structures',
    subtopic: 'Union-Find (Disjoint Set)',
    difficulty: 'hard',
    statement: 'Implement disjoint set union with path compression and rank balance in Java.',
    concepts: ['Union-Find', 'path compression', 'disjoint set'],
    code: `public class DisjointSetUnion {
    private final int[] parent;
    private final int[] rank;

    public DisjointSetUnion(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    public int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }

    public boolean union(int i, int j) {
        int rootI = find(i), rootJ = find(j);
        if (rootI == rootJ) return false;
        if (rank[rootI] < rank[rootJ]) parent[rootI] = rootJ;
        else if (rank[rootI] > rank[rootJ]) parent[rootJ] = rootI;
        else { parent[rootJ] = rootI; rank[rootI]++; }
        return true;
    }
}`,
    estimatedDuration: '70s',
    codeLength: 'medium',
    tags: ['union-find', 'graphs', 'dsu']
  },

  // ================= F. ALGORITHMS & PROBLEM-SOLVING =================
  {
    id: 'java-algo-01',
    title: 'Binary Search Over Sorted Array',
    language: 'java',
    mainTopic: 'java-algorithms',
    subtopic: 'Binary Search & Arrays',
    difficulty: 'easy',
    statement: 'Perform logarithmic search on a sorted integer array preventing 32-bit integer overflow.',
    concepts: ['binary search', 'overflow-safe midpoint', 'logarithmic time'],
    code: `public class BinarySearch {
    public static int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
}`,
    estimatedDuration: '45s',
    codeLength: 'short',
    tags: ['binary-search', 'algorithms', 'arrays']
  },
  {
    id: 'java-algo-02',
    title: 'Two Pointers Palindrome Verification',
    language: 'java',
    mainTopic: 'java-algorithms',
    subtopic: 'Two Pointers Technique',
    difficulty: 'easy',
    statement: 'Verify if an alphanumeric string reads identically forward and backward using two pointers.',
    concepts: ['two pointers', 'Character.isLetterOrDigit', 'Character.toLowerCase'],
    code: `public class ValidPalindrome {
    public static boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}`,
    estimatedDuration: '55s',
    codeLength: 'medium',
    tags: ['two-pointers', 'strings', 'palindrome']
  },
  {
    id: 'java-algo-03',
    title: 'Sliding Window Maximum Sum Subarray',
    language: 'java',
    mainTopic: 'java-algorithms',
    subtopic: 'Sliding Window & Subarrays',
    difficulty: 'medium',
    statement: 'Find the maximum sum of any contiguous subarray of fixed size K in O(N) time.',
    concepts: ['sliding window', 'fixed window', 'Math.max'],
    code: `public class MaxSubarraySum {
    public static int maxSubarraySum(int[] nums, int k) {
        if (nums == null || nums.length < k) return 0;
        int windowSum = 0;
        for (int i = 0; i < k; i++) {
            windowSum += nums[i];
        }
        int maxSum = windowSum;
        for (int i = k; i < nums.length; i++) {
            windowSum += nums[i] - nums[i - k];
            maxSum = Math.max(maxSum, windowSum);
        }
        return maxSum;
    }
}`,
    estimatedDuration: '50s',
    codeLength: 'medium',
    tags: ['sliding-window', 'arrays', 'optimization']
  },
  {
    id: 'java-algo-04',
    title: 'Two Sum Map Lookup Algorithm',
    language: 'java',
    mainTopic: 'java-algorithms',
    subtopic: 'Prefix Sums & Hashing',
    difficulty: 'easy',
    statement: 'Locate indices of two integers summing to target in single pass O(N) time with HashMap.',
    concepts: ['HashMap', 'complement', 'single pass'],
    code: `import java.util.HashMap;
import java.util.Map;

public class TwoSum {
    public static int[] findIndices(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }
}`,
    estimatedDuration: '45s',
    codeLength: 'short',
    tags: ['hashmap', 'two-sum', 'algorithms']
  },
  {
    id: 'java-algo-05',
    title: 'Merge Sort Divide and Conquer',
    language: 'java',
    mainTopic: 'java-algorithms',
    subtopic: 'Sorting Algorithms',
    difficulty: 'hard',
    statement: 'Implement recursive Merge Sort with guaranteed O(N log N) worst-case time complexity.',
    concepts: ['merge sort', 'divide and conquer', 'recursion'],
    code: `public class MergeSort {
    public static void sort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            sort(arr, left, mid);
            sort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }

    private static void merge(int[] arr, int left, int mid, int right) {
        int[] temp = new int[right - left + 1];
        int i = left, j = mid + 1, k = 0;
        while (i <= mid && j <= right) {
            temp[k++] = (arr[i] <= arr[j]) ? arr[i++] : arr[j++];
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= right) temp[k++] = arr[j++];
        System.arraycopy(temp, 0, arr, left, temp.length);
    }
}`,
    estimatedDuration: '80s',
    codeLength: 'long',
    tags: ['sorting', 'merge-sort', 'divide-conquer']
  },
  {
    id: 'java-algo-06',
    title: 'Backtracking Permutations of Numbers',
    language: 'java',
    mainTopic: 'java-algorithms',
    subtopic: 'Recursion & Backtracking',
    difficulty: 'hard',
    statement: 'Generate all unique permutations of an integer array using boolean visited state backtracking.',
    concepts: ['backtracking', 'recursion', 'permutations', 'visited array'],
    code: `import java.util.*;

public class Permutations {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, new ArrayList<>(), new boolean[nums.length], result);
        return result;
    }

    private void backtrack(int[] nums, List<Integer> current, boolean[] used, List<List<Integer>> result) {
        if (current.size() == nums.length) {
            result.add(new ArrayList<>(current));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            current.add(nums[i]);
            backtrack(nums, current, used, result);
            current.remove(current.size() - 1);
            used[i] = false;
        }
    }
}`,
    estimatedDuration: '75s',
    codeLength: 'long',
    tags: ['backtracking', 'permutations', 'recursion']
  },
  {
    id: 'java-algo-07',
    title: 'Dynamic Programming Longest Increasing Subsequence',
    language: 'java',
    mainTopic: 'java-algorithms',
    subtopic: 'Dynamic Programming (DP)',
    difficulty: 'hard',
    statement: 'Compute the length of the longest strictly increasing subsequence in an array with DP.',
    concepts: ['dynamic programming', 'LIS', 'subsequence', 'Arrays.fill'],
    code: `import java.util.Arrays;

public class LongestIncreasingSubsequence {
    public static int lengthOfLIS(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        int[] dp = new int[nums.length];
        Arrays.fill(dp, 1);
        int maxLen = 1;

        for (int i = 1; i < nums.length; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            maxLen = Math.max(maxLen, dp[i]);
        }
        return maxLen;
    }
}`,
    estimatedDuration: '65s',
    codeLength: 'medium',
    tags: ['dp', 'lis', 'subsequence']
  },
  {
    id: 'java-algo-08',
    title: 'Bit Manipulation Single Number XOR',
    language: 'java',
    mainTopic: 'java-algorithms',
    subtopic: 'Bit Manipulation & Math',
    difficulty: 'easy',
    statement: 'Find the unique element appearing once while all other elements appear twice using XOR.',
    concepts: ['bitwise XOR ^', 'constant space', 'linear time'],
    code: `public class SingleNumberFinder {
    public static int findSingleNumber(int[] nums) {
        int unique = 0;
        for (int num : nums) {
            unique ^= num;
        }
        return unique;
    }
}`,
    estimatedDuration: '25s',
    codeLength: 'short',
    tags: ['bit-manipulation', 'xor', 'math']
  }
];
