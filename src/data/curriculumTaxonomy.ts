import { CurriculumTopic, Language } from '../types';

export const CURRICULUM_TAXONOMY: CurriculumTopic[] = [
  // ================= C++ TAXONOMY =================
  {
    id: 'cpp-fundamentals',
    name: 'Programming Fundamentals',
    language: 'cpp',
    description: 'Basic syntax, I/O streams, primitive types, operators, conditionals, and loops.',
    subtopics: [
      'Hello World & Output',
      'Variables & Primitive Types',
      'Input with cin & Type Casting',
      'Operators & Expressions',
      'Conditionals & Switch',
      'Loops & Iteration',
      'Nested Loops & Pattern Printing',
      'Break, Continue & Control Flow'
    ]
  },
  {
    id: 'cpp-functions',
    name: 'Functions & Core Features',
    language: 'cpp',
    description: 'Declarations, parameters, function overloading, recursion, references, pointers, and memory basics.',
    subtopics: [
      'Declarations & Definitions',
      'Parameters & Return Values',
      'Function Overloading & Defaults',
      'Recursion & Call Stack',
      'References & Pass-by-Reference',
      'Pointers & Memory Addresses',
      'Arrays & C-Style Strings',
      'Structs, Enums & Type Aliases',
      'Dynamic Memory & const Correctness'
    ]
  },
  {
    id: 'cpp-oop',
    name: 'Object-Oriented Programming',
    language: 'cpp',
    description: 'Encapsulation, constructors/destructors, inheritance, polymorphism, virtual tables, and operators.',
    subtopics: [
      'Classes & Encapsulation',
      'Constructors & Destructors',
      'Inheritance & Access Modifiers',
      'Polymorphism & Virtual Functions',
      'Abstract Classes & Interfaces',
      'Static Members & Friend Functions',
      'Operator Overloading',
      'Exception Handling (try/catch)'
    ]
  },
  {
    id: 'cpp-stl',
    name: 'Standard Template Library (STL)',
    language: 'cpp',
    description: 'Sequence containers, associative maps/sets, iterators, lambdas, and high-performance algorithms.',
    subtopics: [
      'std::vector & Dynamic Arrays',
      'std::pair & std::tuple',
      'std::stack & std::queue',
      'std::deque & std::list',
      'std::set & std::map',
      'std::unordered_map & Hashing',
      'Iterators & Ranges',
      'STL Algorithms (sort, search, bounds)'
    ]
  },
  {
    id: 'cpp-data-structures',
    name: 'Data Structures',
    language: 'cpp',
    description: 'Linked lists, trees, heaps, tries, graphs, disjoint sets, and advanced trees.',
    subtopics: [
      'Singly & Doubly Linked Lists',
      'Stacks & Queues',
      'Binary Trees & Traversals',
      'Binary Search Trees (BST)',
      'Heaps & Priority Queues',
      'Trie Prefix Trees',
      'Graphs & Adjacency Representations',
      'Disjoint Set Union (DSU)',
      'Segment Tree & Fenwick Tree'
    ]
  },
  {
    id: 'cpp-algorithms',
    name: 'Algorithms & Problem-Solving',
    language: 'cpp',
    description: 'Searching, sorting, two pointers, sliding window, greedy algorithms, DP, and number theory.',
    subtopics: [
      'Linear & Binary Search',
      'Sorting (Merge & Quick Sort)',
      'Two Pointers & Sliding Window',
      'Prefix Sums & Frequency Counting',
      'Greedy Algorithms',
      'Backtracking & Permutations',
      'Dynamic Programming (DP)',
      'Shortest Paths (Dijkstra/BFS)',
      'Bit Manipulation & Number Theory'
    ]
  },

  // ================= JAVA TAXONOMY =================
  {
    id: 'java-fundamentals',
    name: 'Java Fundamentals',
    language: 'java',
    description: 'Main method entry points, primitive types, operators, Scanner I/O, switch expressions, and loops.',
    subtopics: [
      'Hello World & Main Entry',
      'Variables & Primitives',
      'Operators & Type Casting',
      'Scanner Input & System Output',
      'Conditionals & Switch Expressions',
      'Loops & Enhanced For-Each',
      'Methods & Method Overloading',
      'Arrays & Multidimensional Arrays',
      'String & StringBuilder',
      'Wrapper Classes & Varargs'
    ]
  },
  {
    id: 'java-oop',
    name: 'Object-Oriented Programming',
    language: 'java',
    description: 'Classes, constructors, this/super, inheritance, method overriding, interfaces, records, and exceptions.',
    subtopics: [
      'Classes & Constructors',
      'this & super References',
      'Encapsulation & Access Modifiers',
      'Inheritance & Method Overriding',
      'Runtime Polymorphism',
      'Abstract Classes & Interfaces',
      'Static, Final & Constants',
      'Object Methods (equals, hashCode)',
      'Exception Handling & Custom Exceptions'
    ]
  },
  {
    id: 'java-collections',
    name: 'Java Collections Framework',
    language: 'java',
    description: 'List, Set, Map, Queue, ArrayDeque, PriorityQueue, iterators, and custom Comparators.',
    subtopics: [
      'ArrayList & Dynamic Lists',
      'LinkedList as List & Deque',
      'ArrayDeque & PriorityQueue',
      'HashSet & TreeSet',
      'HashMap & LinkedHashMap',
      'TreeMap & Sorted Navigation',
      'Iterators & ListIterator',
      'Comparable & Comparator',
      'Collections Utilities & Sorting'
    ]
  },
  {
    id: 'java-core-concepts',
    name: 'Core Java Concepts',
    language: 'java',
    description: 'String immutability, generics, functional interfaces, streams, threads, and concurrency basics.',
    subtopics: [
      'String Immutability & Pooling',
      'Generics & Type Safety',
      'Functional Interfaces & Lambdas',
      'Java 8 Stream Pipeline',
      'Threads & Runnable',
      'Synchronization & Locks',
      'ExecutorService & Concurrency'
    ]
  },
  {
    id: 'java-data-structures',
    name: 'Data Structures in Java',
    language: 'java',
    description: 'Linked nodes, stacks, queues, binary search trees, min/max heaps, tries, and graph structures.',
    subtopics: [
      'Custom Linked List Nodes',
      'Stack & Queue Implementation',
      'Binary Trees & Level Traversal',
      'Binary Search Tree (BST)',
      'Min-Heap with PriorityQueue',
      'Trie Prefix Tree',
      'Graph Representations & BFS/DFS',
      'Union-Find (Disjoint Set)'
    ]
  },
  {
    id: 'java-algorithms',
    name: 'Algorithms & Problem-Solving',
    language: 'java',
    description: 'Binary search, two pointers, sliding window, sorting, backtracking, greedy, and dynamic programming.',
    subtopics: [
      'Binary Search & Arrays',
      'Two Pointers Technique',
      'Sliding Window & Subarrays',
      'Sorting Algorithms',
      'Recursion & Backtracking',
      'Greedy Interval & Activity Scheduling',
      'Dynamic Programming (DP)',
      'Bit Manipulation & Math'
    ]
  }
];

export function getTopicsForLanguage(language: Language): CurriculumTopic[] {
  return CURRICULUM_TAXONOMY.filter((t) => t.language === language);
}

export function getTopicById(topicId: string): CurriculumTopic | undefined {
  return CURRICULUM_TAXONOMY.find((t) => t.id === topicId);
}
