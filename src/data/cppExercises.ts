import { Exercise } from '../types';

export const CPP_EXERCISES: Exercise[] = [
  // ================= A. PROGRAMMING FUNDAMENTALS =================
  {
    id: 'cpp-fund-01',
    title: 'Hello World and Standard Output',
    language: 'cpp',
    mainTopic: 'cpp-fundamentals',
    subtopic: 'Hello World & Output',
    difficulty: 'beginner',
    statement: 'Output formatted text to the standard console stream using std::cout and std::endl.',
    concepts: ['#include <iostream>', 'std::cout', 'std::endl', 'main function'],
    code: `#include <iostream>

int main() {
    std::cout << "Welcome to CodeType C++ practice!" << std::endl;
    std::cout << "Think in code. Type with flow." << std::endl;
    return 0;
}`,
    estimatedDuration: '25s',
    codeLength: 'short',
    tags: ['basics', 'iostream', 'cout']
  },
  {
    id: 'cpp-fund-02',
    title: 'Variables and Primitive Types',
    language: 'cpp',
    mainTopic: 'cpp-fundamentals',
    subtopic: 'Variables & Primitive Types',
    difficulty: 'beginner',
    statement: 'Declare and initialize various C++ primitive scalar types including int, double, bool, and char.',
    concepts: ['primitive types', 'initialization', 'size_t', 'type safety'],
    code: `#include <iostream>

int main() {
    int age = 24;
    double accuracy = 98.75;
    char grade = 'A';
    bool isActive = true;

    std::cout << "Age: " << age << " Acc: " << accuracy << "%" << std::endl;
    return 0;
}`,
    estimatedDuration: '35s',
    codeLength: 'short',
    tags: ['variables', 'primitives', 'types']
  },
  {
    id: 'cpp-fund-03',
    title: 'Input with std::cin and Type Casting',
    language: 'cpp',
    mainTopic: 'cpp-fundamentals',
    subtopic: 'Input with cin & Type Casting',
    difficulty: 'beginner',
    statement: 'Read values from standard input and perform explicit type casting using static_cast.',
    concepts: ['std::cin', 'static_cast', 'integer division', 'floating point'],
    code: `#include <iostream>

int main() {
    int totalScore = 485;
    int testCount = 5;
    double average = static_cast<double>(totalScore) / testCount;

    std::cout << "Mean Score: " << average << std::endl;
    return 0;
}`,
    estimatedDuration: '35s',
    codeLength: 'short',
    tags: ['cin', 'type-casting', 'static_cast']
  },
  {
    id: 'cpp-fund-04',
    title: 'Arithmetic and Logical Operators',
    language: 'cpp',
    mainTopic: 'cpp-fundamentals',
    subtopic: 'Operators & Expressions',
    difficulty: 'beginner',
    statement: 'Evaluate logical truth conditions and arithmetic expressions using compound comparison operators.',
    concepts: ['relational operators', 'logical and/or', 'modulo operator', 'boolean logic'],
    code: `bool isLeapYear(int year) {
    bool div4 = (year % 4 == 0);
    bool div100 = (year % 100 == 0);
    bool div400 = (year % 400 == 0);
    return (div4 && !div100) || div400;
}`,
    estimatedDuration: '30s',
    codeLength: 'short',
    tags: ['operators', 'boolean', 'modulo']
  },
  {
    id: 'cpp-fund-05',
    title: 'Switch Statement Day Formatter',
    language: 'cpp',
    mainTopic: 'cpp-fundamentals',
    subtopic: 'Conditionals & Switch',
    difficulty: 'easy',
    statement: 'Implement an integer-based switch branch structure with standard break statements and default fallbacks.',
    concepts: ['switch', 'case', 'break', 'default'],
    code: `const char* getDayName(int dayIndex) {
    switch (dayIndex) {
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
        case 7: return "Sunday";
        default: return "Invalid Day";
    }
}`,
    estimatedDuration: '40s',
    codeLength: 'short',
    tags: ['switch', 'conditionals', 'control-flow']
  },
  {
    id: 'cpp-fund-06',
    title: 'While Loop Collatz Sequence',
    language: 'cpp',
    mainTopic: 'cpp-fundamentals',
    subtopic: 'Loops & Iteration',
    difficulty: 'easy',
    statement: 'Generate step counts of the 3n + 1 Collatz conjecture until convergence using a while loop.',
    concepts: ['while loop', 'loop condition', 'modulo', 'arithmetic'],
    code: `int collatzSteps(int n) {
    int steps = 0;
    while (n > 1) {
        if (n % 2 == 0) {
            n /= 2;
        } else {
            n = 3 * n + 1;
        }
        steps++;
    }
    return steps;
}`,
    estimatedDuration: '40s',
    codeLength: 'short',
    tags: ['loops', 'while', 'math']
  },
  {
    id: 'cpp-fund-07',
    title: 'Nested Loops Triangle Pattern',
    language: 'cpp',
    mainTopic: 'cpp-fundamentals',
    subtopic: 'Nested Loops & Pattern Printing',
    difficulty: 'easy',
    statement: 'Print an aligned coordinate matrix pattern using dual nested for loops.',
    concepts: ['nested loops', 'iteration', 'stdout formatting'],
    code: `#include <iostream>

void printPyramid(int rows) {
    for (int i = 1; i <= rows; ++i) {
        for (int space = 1; space <= rows - i; ++space) {
            std::cout << " ";
        }
        for (int star = 1; star <= (2 * i - 1); ++star) {
            std::cout << "*";
        }
        std::cout << "\\n";
    }
}`,
    estimatedDuration: '50s',
    codeLength: 'medium',
    tags: ['nested-loops', 'patterns', 'formatting']
  },
  {
    id: 'cpp-fund-08',
    title: 'Break and Continue Loop Filter',
    language: 'cpp',
    mainTopic: 'cpp-fundamentals',
    subtopic: 'Break, Continue & Control Flow',
    difficulty: 'easy',
    statement: 'Demonstrate early loop termination with break and conditional skip with continue.',
    concepts: ['break', 'continue', 'loop control', 'filtering'],
    code: `int sumFilteredEvens(const int arr[], int size, int stopValue) {
    int total = 0;
    for (int i = 0; i < size; ++i) {
        if (arr[i] == stopValue) break;
        if (arr[i] % 2 != 0) continue;
        total += arr[i];
    }
    return total;
}`,
    estimatedDuration: '40s',
    codeLength: 'short',
    tags: ['break', 'continue', 'arrays']
  },

  // ================= B. FUNCTIONS AND CORE LANGUAGE FEATURES =================
  {
    id: 'cpp-func-01',
    title: 'Function Overloading with Numbers',
    language: 'cpp',
    mainTopic: 'cpp-functions',
    subtopic: 'Function Overloading & Defaults',
    difficulty: 'easy',
    statement: 'Define multiple function signatures with identical identifiers handling int and double types.',
    concepts: ['function overloading', 'static dispatch', 'signatures'],
    code: `int maxVal(int a, int b) {
    return (a > b) ? a : b;
}

double maxVal(double a, double b) {
    return (a > b) ? a : b;
}

int maxVal(int a, int b, int c) {
    return maxVal(maxVal(a, b), c);
}`,
    estimatedDuration: '35s',
    codeLength: 'short',
    tags: ['functions', 'overloading', 'polymorphism']
  },
  {
    id: 'cpp-func-02',
    title: 'Recursive Greatest Common Divisor',
    language: 'cpp',
    mainTopic: 'cpp-functions',
    subtopic: 'Recursion & Call Stack',
    difficulty: 'easy',
    statement: 'Compute the greatest common divisor of two integers using the Euclidean recursion pattern.',
    concepts: ['recursion', 'base case', 'euclidean algorithm'],
    code: `long long gcd(long long a, long long b) {
    if (b == 0) {
        return a;
    }
    return gcd(b, a % b);
}

long long lcm(long long a, long long b) {
    if (a == 0 || b == 0) return 0;
    return (a / gcd(a, b)) * b;
}`,
    estimatedDuration: '40s',
    codeLength: 'short',
    tags: ['recursion', 'gcd', 'math']
  },
  {
    id: 'cpp-func-03',
    title: 'References and Pass-by-Reference Swap',
    language: 'cpp',
    mainTopic: 'cpp-functions',
    subtopic: 'References & Pass-by-Reference',
    difficulty: 'beginner',
    statement: 'Modify caller arguments in place without copying using C++ lvalue reference semantics.',
    concepts: ['references', '& operator', 'aliasing', 'in-place mutation'],
    code: `void swapValues(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

void clampRef(int& value, int low, int high) {
    if (value < low) value = low;
    else if (value > high) value = high;
}`,
    estimatedDuration: '35s',
    codeLength: 'short',
    tags: ['references', 'pointers', 'memory']
  },
  {
    id: 'cpp-func-04',
    title: 'Pointers and Array Pointer Arithmetic',
    language: 'cpp',
    mainTopic: 'cpp-functions',
    subtopic: 'Pointers & Memory Addresses',
    difficulty: 'easy',
    statement: 'Traverse contiguous buffer memory using raw pointer incrementation and dereferencing.',
    concepts: ['pointers', 'dereference *', 'pointer arithmetic', 'nullptr'],
    code: `int sumPointerArray(const int* start, int size) {
    if (start == nullptr || size <= 0) return 0;
    int sum = 0;
    const int* end = start + size;
    for (const int* ptr = start; ptr < end; ++ptr) {
        sum += *ptr;
    }
    return sum;
}`,
    estimatedDuration: '45s',
    codeLength: 'short',
    tags: ['pointers', 'memory', 'arrays']
  },
  {
    id: 'cpp-func-05',
    title: 'Struct with Member Methods',
    language: 'cpp',
    mainTopic: 'cpp-functions',
    subtopic: 'Structs, Enums & Type Aliases',
    difficulty: 'easy',
    statement: 'Create a lightweight 2D Point structure with methods for Euclidean distance calculation.',
    concepts: ['struct', 'member methods', 'cmath', 'const methods'],
    code: `#include <cmath>

struct Point2D {
    double x;
    double y;

    double distanceTo(const Point2D& other) const {
        double dx = x - other.x;
        double dy = y - other.y;
        return std::sqrt(dx * dx + dy * dy);
    }
};`,
    estimatedDuration: '45s',
    codeLength: 'short',
    tags: ['struct', 'geometry', 'const']
  },
  {
    id: 'cpp-func-06',
    title: 'const Correctness and Read-Only Views',
    language: 'cpp',
    mainTopic: 'cpp-functions',
    subtopic: 'Dynamic Memory & const Correctness',
    difficulty: 'medium',
    statement: 'Enforce const correctness on pointer parameters and member functions to prevent accidental mutation.',
    concepts: ['const correctness', 'const pointers', 'string views'],
    code: `#include <string>
#include <string_view>

class UserRegistry {
private:
    std::string defaultRole = "guest";
public:
    const std::string& getRole() const {
        return defaultRole;
    }
    bool validateKey(std::string_view key) const {
        return !key.empty() && key.length() >= 8;
    }
};`,
    estimatedDuration: '50s',
    codeLength: 'short',
    tags: ['const', 'string_view', 'safety']
  },

  // ================= C. OBJECT-ORIENTED PROGRAMMING =================
  {
    id: 'cpp-oop-01',
    title: 'Class with Encapsulation and Access Modifiers',
    language: 'cpp',
    mainTopic: 'cpp-oop',
    subtopic: 'Classes & Encapsulation',
    difficulty: 'easy',
    statement: 'Implement a BankAccount class with private balances, public getters, and safe mutations.',
    concepts: ['class', 'encapsulation', 'private/public', 'invariants'],
    code: `class BankAccount {
private:
    double balance;
public:
    explicit BankAccount(double initialBalance) : balance(initialBalance) {}

    bool deposit(double amount) {
        if (amount <= 0) return false;
        balance += amount;
        return true;
    }

    double getBalance() const {
        return balance;
    }
};`,
    estimatedDuration: '45s',
    codeLength: 'medium',
    tags: ['oop', 'classes', 'encapsulation']
  },
  {
    id: 'cpp-oop-02',
    title: 'Copy Constructor and Destructor Clean-Up',
    language: 'cpp',
    mainTopic: 'cpp-oop',
    subtopic: 'Constructors & Destructors',
    difficulty: 'medium',
    statement: 'Implement deep copy semantics and dynamic array memory deallocation inside a destructor.',
    concepts: ['Rule of Three', 'copy constructor', 'destructor', 'delete[]'],
    code: `class IntBuffer {
private:
    int* data;
    size_t length;
public:
    explicit IntBuffer(size_t size) : length(size), data(new int[size]()) {}

    ~IntBuffer() {
        delete[] data;
    }

    IntBuffer(const IntBuffer& other) : length(other.length), data(new int[other.length]) {
        for (size_t i = 0; i < length; ++i) {
            data[i] = other.data[i];
        }
    }
};`,
    estimatedDuration: '65s',
    codeLength: 'medium',
    tags: ['rule-of-three', 'destructors', 'memory']
  },
  {
    id: 'cpp-oop-03',
    title: 'Inheritance and Base Member Initialization',
    language: 'cpp',
    mainTopic: 'cpp-oop',
    subtopic: 'Inheritance & Access Modifiers',
    difficulty: 'easy',
    statement: 'Derive a Specialized Student class from a Base Person class using member initializer lists.',
    concepts: ['public inheritance', 'base constructor call', 'protected modifier'],
    code: `#include <string>

class Person {
protected:
    std::string name;
public:
    explicit Person(std::string personName) : name(std::move(personName)) {}
    const std::string& getName() const { return name; }
};

class Student : public Person {
private:
    int studentId;
public:
    Student(std::string name, int id) : Person(std::move(name)), studentId(id) {}
    int getId() const { return studentId; }
};`,
    estimatedDuration: '55s',
    codeLength: 'medium',
    tags: ['inheritance', 'oop', 'constructors']
  },
  {
    id: 'cpp-oop-04',
    title: 'Virtual Functions and Dynamic Polymorphism',
    language: 'cpp',
    mainTopic: 'cpp-oop',
    subtopic: 'Polymorphism & Virtual Functions',
    difficulty: 'medium',
    statement: 'Declare a virtual destructor and override area computations dynamically across shapes.',
    concepts: ['virtual destructor', 'override', 'vtable', 'polymorphism'],
    code: `class Shape {
public:
    virtual ~Shape() = default;
    virtual double area() const = 0;
};

class Circle : public Shape {
private:
    double radius;
public:
    explicit Circle(double r) : radius(r) {}
    double area() const override {
        return 3.1415926535 * radius * radius;
    }
};`,
    estimatedDuration: '50s',
    codeLength: 'medium',
    tags: ['virtual', 'polymorphism', 'abstract']
  },
  {
    id: 'cpp-oop-05',
    title: 'Static Members and Factory Counter',
    language: 'cpp',
    mainTopic: 'cpp-oop',
    subtopic: 'Static Members & Friend Functions',
    difficulty: 'easy',
    statement: 'Track total live object instances across a class using static member variables and methods.',
    concepts: ['static variable', 'static method', 'instance counting'],
    code: `class SessionTracker {
private:
    int sessionId;
    static inline int totalInstances = 0;
public:
    SessionTracker() : sessionId(++totalInstances) {}
    ~SessionTracker() { --totalInstances; }

    int getId() const { return sessionId; }
    static int getActiveCount() { return totalInstances; }
};`,
    estimatedDuration: '45s',
    codeLength: 'short',
    tags: ['static', 'oop', 'counters']
  },
  {
    id: 'cpp-oop-06',
    title: 'Operator Overloading for Vector2D',
    language: 'cpp',
    mainTopic: 'cpp-oop',
    subtopic: 'Operator Overloading',
    difficulty: 'medium',
    statement: 'Overload operator+ and operator== for mathematical vector addition and equality comparisons.',
    concepts: ['operator+', 'operator==', 'const reference', 'value semantics'],
    code: `struct Vec2 {
    float x, y;

    Vec2 operator+(const Vec2& other) const {
        return { x + other.x, y + other.y };
    }

    bool operator==(const Vec2& other) const {
        return (x == other.x) && (y == other.y);
    }

    Vec2 operator*(float scalar) const {
        return { x * scalar, y * scalar };
    }
};`,
    estimatedDuration: '45s',
    codeLength: 'short',
    tags: ['operator-overloading', 'math', 'vectors']
  },
  {
    id: 'cpp-oop-07',
    title: 'Custom Exception Class Hierarchy',
    language: 'cpp',
    mainTopic: 'cpp-oop',
    subtopic: 'Exception Handling (try/catch)',
    difficulty: 'medium',
    statement: 'Subclass std::runtime_error to provide distinct, informative domain exceptions.',
    concepts: ['std::runtime_error', 'noexcept', 'what()', 'throw/catch'],
    code: `#include <stdexcept>
#include <string>

class ValidationException : public std::runtime_error {
public:
    explicit ValidationException(const std::string& field)
        : std::runtime_error("Validation failed for field: " + field) {}
};

int parsePort(int port) {
    if (port < 1 || port > 65535) {
        throw ValidationException("port");
    }
    return port;
}`,
    estimatedDuration: '50s',
    codeLength: 'medium',
    tags: ['exceptions', 'try-catch', 'runtime_error']
  },

  // ================= D. STANDARD TEMPLATE LIBRARY (STL) =================
  {
    id: 'cpp-stl-01',
    title: 'std::vector Insertion and Accumulation',
    language: 'cpp',
    mainTopic: 'cpp-stl',
    subtopic: 'std::vector & Dynamic Arrays',
    difficulty: 'easy',
    statement: 'Push elements into a dynamic std::vector and sum them using range-based for loops.',
    concepts: ['std::vector', 'push_back', 'range-for', 'size()'],
    code: `#include <vector>
#include <numeric>

long long sumVector(const std::vector<int>& numbers) {
    long long total = 0;
    for (int n : numbers) {
        total += n;
    }
    return total;
}`,
    estimatedDuration: '30s',
    codeLength: 'short',
    tags: ['vector', 'stl', 'loops']
  },
  {
    id: 'cpp-stl-02',
    title: 'std::pair and std::tuple Extraction',
    language: 'cpp',
    mainTopic: 'cpp-stl',
    subtopic: 'std::pair & std::tuple',
    difficulty: 'easy',
    statement: 'Return compound results using std::pair and unpack them with C++17 structured bindings.',
    concepts: ['std::pair', 'structured binding', 'min/max'],
    code: `#include <utility>
#include <vector>
#include <algorithm>

std::pair<int, int> findMinMax(const std::vector<int>& arr) {
    if (arr.empty()) return {0, 0};
    int minVal = arr[0], maxVal = arr[0];
    for (int val : arr) {
        minVal = std::min(minVal, val);
        maxVal = std::max(maxVal, val);
    }
    return {minVal, maxVal};
}`,
    estimatedDuration: '45s',
    codeLength: 'short',
    tags: ['pair', 'tuple', 'structured-binding']
  },
  {
    id: 'cpp-stl-03',
    title: 'Stack Bracket Balancer',
    language: 'cpp',
    mainTopic: 'cpp-stl',
    subtopic: 'std::stack & std::queue',
    difficulty: 'medium',
    statement: 'Determine whether parenthesis and bracket nesting is syntactically valid with std::stack.',
    concepts: ['std::stack', 'push', 'pop', 'top', 'bracket matching'],
    code: `#include <string>
#include <stack>

bool areBracketsBalanced(const std::string& expr) {
    std::stack<char> st;
    for (char ch : expr) {
        if (ch == '(' || ch == '{' || ch == '[') {
            st.push(ch);
        } else if (ch == ')' || ch == '}' || ch == ']') {
            if (st.empty()) return false;
            char open = st.top();
            st.pop();
            if ((ch == ')' && open != '(') ||
                (ch == '}' && open != '{') ||
                (ch == ']' && open != '[')) {
                return false;
            }
        }
    }
    return st.empty();
}`,
    estimatedDuration: '65s',
    codeLength: 'medium',
    tags: ['stack', 'brackets', 'syntax']
  },
  {
    id: 'cpp-stl-04',
    title: 'std::deque Sliding Window Maximum',
    language: 'cpp',
    mainTopic: 'cpp-stl',
    subtopic: 'std::deque & std::list',
    difficulty: 'hard',
    statement: 'Maintain monotonic indices in a double-ended queue to find maximums across sliding windows.',
    concepts: ['std::deque', 'monotonic queue', 'sliding window', 'indices'],
    code: `#include <vector>
#include <deque>

std::vector<int> maxSlidingWindow(const std::vector<int>& nums, int k) {
    std::vector<int> result;
    std::deque<int> dq;
    for (int i = 0; i < static_cast<int>(nums.size()); ++i) {
        if (!dq.empty() && dq.front() <= i - k) dq.pop_front();
        while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k - 1) result.push_back(nums[dq.front()]);
    }
    return result;
}`,
    estimatedDuration: '65s',
    codeLength: 'medium',
    tags: ['deque', 'sliding-window', 'advanced']
  },
  {
    id: 'cpp-stl-05',
    title: 'std::unordered_map Frequency Counter',
    language: 'cpp',
    mainTopic: 'cpp-stl',
    subtopic: 'std::unordered_map & Hashing',
    difficulty: 'easy',
    statement: 'Count frequencies of integers in O(N) average time using a hash table.',
    concepts: ['std::unordered_map', 'hashing', 'key-value', 'lookup'],
    code: `#include <vector>
#include <unordered_map>

std::unordered_map<int, int> countFrequencies(const std::vector<int>& items) {
    std::unordered_map<int, int> counts;
    for (int num : items) {
        counts[num]++;
    }
    return counts;
}`,
    estimatedDuration: '30s',
    codeLength: 'short',
    tags: ['unordered_map', 'hashmap', 'counting']
  },
  {
    id: 'cpp-stl-06',
    title: 'STL Algorithms with Custom Lambda Comparator',
    language: 'cpp',
    mainTopic: 'cpp-stl',
    subtopic: 'STL Algorithms (sort, search, bounds)',
    difficulty: 'medium',
    statement: 'Sort pairs descending by value and ascending by key using std::sort and a C++ lambda expression.',
    concepts: ['std::sort', 'lambdas', 'custom comparators', 'tie'],
    code: `#include <vector>
#include <algorithm>
#include <string>

struct Record {
    std::string name;
    int score;
};

void sortRecords(std::vector<Record>& records) {
    std::sort(records.begin(), records.end(), [](const Record& a, const Record& b) {
        if (a.score != b.score) {
            return a.score > b.score; // descending score
        }
        return a.name < b.name;       // ascending name
    });
}`,
    estimatedDuration: '50s',
    codeLength: 'medium',
    tags: ['sort', 'lambda', 'comparator']
  },
  {
    id: 'cpp-stl-07',
    title: 'std::lower_bound and upper_bound Binary Range',
    language: 'cpp',
    mainTopic: 'cpp-stl',
    subtopic: 'STL Algorithms (sort, search, bounds)',
    difficulty: 'medium',
    statement: 'Find the count of elements equal to target in a sorted vector using lower_bound and upper_bound.',
    concepts: ['std::lower_bound', 'std::upper_bound', 'iterators', 'distance'],
    code: `#include <vector>
#include <algorithm>

int countOccurrencesSorted(const std::vector<int>& sortedVec, int target) {
    auto low = std::lower_bound(sortedVec.begin(), sortedVec.end(), target);
    auto high = std::upper_bound(sortedVec.begin(), sortedVec.end(), target);
    return static_cast<int>(std::distance(low, high));
}`,
    estimatedDuration: '40s',
    codeLength: 'short',
    tags: ['binary-search', 'bounds', 'algorithms']
  },

  // ================= E. DATA STRUCTURES =================
  {
    id: 'cpp-dsa-01',
    title: 'Singly Linked List Reversal',
    language: 'cpp',
    mainTopic: 'cpp-data-structures',
    subtopic: 'Singly & Doubly Linked Lists',
    difficulty: 'medium',
    statement: 'Reverse pointers of a singly linked list in a single pass in-place with O(1) auxiliary memory.',
    concepts: ['linked list', 'pointers', 'in-place reversal', 'nullptr'],
    code: `struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr != nullptr) {
        ListNode* nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`,
    estimatedDuration: '55s',
    codeLength: 'medium',
    tags: ['linked-list', 'pointers', 'reversal']
  },
  {
    id: 'cpp-dsa-02',
    title: 'Doubly Linked List Node Deletion',
    language: 'cpp',
    mainTopic: 'cpp-data-structures',
    subtopic: 'Singly & Doubly Linked Lists',
    difficulty: 'medium',
    statement: 'Unlink an arbitrary node from a doubly linked chain adjusting prev and next links.',
    concepts: ['doubly linked list', 'node deletion', 'bidirectional pointers'],
    code: `struct DNode {
    int val;
    DNode* prev;
    DNode* next;
    DNode(int v) : val(v), prev(nullptr), next(nullptr) {}
};

void unlinkNode(DNode* target) {
    if (!target) return;
    if (target->prev) target->prev->next = target->next;
    if (target->next) target->next->prev = target->prev;
    target->prev = nullptr;
    target->next = nullptr;
}`,
    estimatedDuration: '45s',
    codeLength: 'short',
    tags: ['doubly-linked-list', 'pointers']
  },
  {
    id: 'cpp-dsa-03',
    title: 'Circular Queue Array Implementation',
    language: 'cpp',
    mainTopic: 'cpp-data-structures',
    subtopic: 'Stacks & Queues',
    difficulty: 'medium',
    statement: 'Implement a fixed-capacity circular FIFO ring queue using modulo arithmetic on array indices.',
    concepts: ['circular queue', 'modulo arithmetic', 'enqueue', 'dequeue'],
    code: `class CircularQueue {
private:
    int* data;
    int head = 0, tail = 0, count = 0, cap = 0;
public:
    explicit CircularQueue(int k) : cap(k), data(new int[k]) {}
    ~CircularQueue() { delete[] data; }

    bool enqueue(int val) {
        if (count == cap) return false;
        data[tail] = val;
        tail = (tail + 1) % cap;
        count++;
        return true;
    }
    bool dequeue() {
        if (count == 0) return false;
        head = (head + 1) % cap;
        count--;
        return true;
    }
};`,
    estimatedDuration: '65s',
    codeLength: 'medium',
    tags: ['queue', 'circular-buffer', 'arrays']
  },
  {
    id: 'cpp-dsa-04',
    title: 'Binary Tree In-Order Traversal',
    language: 'cpp',
    mainTopic: 'cpp-data-structures',
    subtopic: 'Binary Trees & Traversals',
    difficulty: 'easy',
    statement: 'Collect values of a binary tree in ascending order according to recursive in-order traversal.',
    concepts: ['binary tree', 'recursion', 'in-order traversal'],
    code: `#include <vector>

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

void inorderHelper(TreeNode* root, std::vector<int>& out) {
    if (!root) return;
    inorderHelper(root->left, out);
    out.push_back(root->val);
    inorderHelper(root->right, out);
}

std::vector<int> inorderTraversal(TreeNode* root) {
    std::vector<int> res;
    inorderHelper(root, res);
    return res;
}`,
    estimatedDuration: '55s',
    codeLength: 'medium',
    tags: ['trees', 'traversal', 'recursion']
  },
  {
    id: 'cpp-dsa-05',
    title: 'Binary Search Tree Validation',
    language: 'cpp',
    mainTopic: 'cpp-data-structures',
    subtopic: 'Binary Search Trees (BST)',
    difficulty: 'medium',
    statement: 'Verify if a binary tree satisfies the BST property across all subtrees with range bounds.',
    concepts: ['BST', 'tree bounds', 'min/max limits'],
    code: `bool validateBST(TreeNode* root, long long minVal, long long maxVal) {
    if (!root) return true;
    if (root->val <= minVal || root->val >= maxVal) {
        return false;
    }
    return validateBST(root->left, minVal, root->val) &&
           validateBST(root->right, root->val, maxVal);
}

bool isValidBST(TreeNode* root) {
    return validateBST(root, -1e18, 1e18);
}`,
    estimatedDuration: '50s',
    codeLength: 'short',
    tags: ['bst', 'trees', 'validation']
  },
  {
    id: 'cpp-dsa-06',
    title: 'Min-Heap Priority Queue Top-K',
    language: 'cpp',
    mainTopic: 'cpp-data-structures',
    subtopic: 'Heaps & Priority Queues',
    difficulty: 'medium',
    statement: 'Maintain a minimum heap of size K to identify the K largest elements in a stream.',
    concepts: ['std::priority_queue', 'min-heap', 'std::greater', 'top-k'],
    code: `#include <vector>
#include <queue>

int findKthLargest(const std::vector<int>& nums, int k) {
    std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;
    for (int num : nums) {
        minHeap.push(num);
        if (static_cast<int>(minHeap.size()) > k) {
            minHeap.pop();
        }
    }
    return minHeap.top();
}`,
    estimatedDuration: '45s',
    codeLength: 'short',
    tags: ['heap', 'priority_queue', 'top-k']
  },
  {
    id: 'cpp-dsa-07',
    title: 'Trie Prefix Tree Implementation',
    language: 'cpp',
    mainTopic: 'cpp-data-structures',
    subtopic: 'Trie Prefix Trees',
    difficulty: 'hard',
    statement: 'Insert strings into a 26-ary Trie prefix tree and query for prefix existence.',
    concepts: ['trie', 'prefix tree', 'pointer arrays', 'character indexing'],
    code: `#include <string>

class TrieNode {
public:
    TrieNode* children[26] = {nullptr};
    bool isWord = false;
};

class Trie {
private:
    TrieNode* root = new TrieNode();
public:
    void insert(const std::string& word) {
        TrieNode* curr = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!curr->children[idx]) curr->children[idx] = new TrieNode();
            curr = curr->children[idx];
        }
        curr->isWord = true;
    }
};`,
    estimatedDuration: '65s',
    codeLength: 'medium',
    tags: ['trie', 'strings', 'advanced']
  },
  {
    id: 'cpp-dsa-08',
    title: 'Disjoint Set Union (DSU) with Path Compression',
    language: 'cpp',
    mainTopic: 'cpp-data-structures',
    subtopic: 'Disjoint Set Union (DSU)',
    difficulty: 'hard',
    statement: 'Implement Union-Find with path compression and rank optimization for near O(1) cycle detection.',
    concepts: ['DSU', 'union find', 'path compression', 'rank optimization'],
    code: `#include <vector>

class DSU {
private:
    std::vector<int> parent;
    std::vector<int> rank;
public:
    explicit DSU(int n) : parent(n), rank(n, 0) {
        for (int i = 0; i < n; ++i) parent[i] = i;
    }
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }
    bool unite(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);
        if (rootI == rootJ) return false;
        if (rank[rootI] < rank[rootJ]) parent[rootI] = rootJ;
        else if (rank[rootI] > rank[rootJ]) parent[rootJ] = rootI;
        else { parent[rootJ] = rootI; rank[rootI]++; }
        return true;
    }
};`,
    estimatedDuration: '75s',
    codeLength: 'long',
    tags: ['dsu', 'graphs', 'union-find']
  },

  // ================= F. ALGORITHMS & PROBLEM-SOLVING =================
  {
    id: 'cpp-algo-01',
    title: 'Binary Search Exact Index Match',
    language: 'cpp',
    mainTopic: 'cpp-algorithms',
    subtopic: 'Linear & Binary Search',
    difficulty: 'easy',
    statement: 'Locate the exact index of an element in a sorted vector with logarithmic time complexity.',
    concepts: ['binary search', 'midpoint calculation', 'sorted arrays'],
    code: `#include <vector>

int binarySearch(const std::vector<int>& arr, int target) {
    int left = 0;
    int right = static_cast<int>(arr.size()) - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
    estimatedDuration: '45s',
    codeLength: 'short',
    tags: ['binary-search', 'algorithms', 'arrays']
  },
  {
    id: 'cpp-algo-02',
    title: 'Two Pointers Two Sum in Sorted Array',
    language: 'cpp',
    mainTopic: 'cpp-algorithms',
    subtopic: 'Two Pointers & Sliding Window',
    difficulty: 'easy',
    statement: 'Find pair of 1-based indices that sum to target in a sorted sequence using converging pointers.',
    concepts: ['two pointers', 'sorted array', 'linear time'],
    code: `#include <vector>

std::vector<int> twoSumSorted(const std::vector<int>& numbers, int target) {
    int left = 0;
    int right = static_cast<int>(numbers.size()) - 1;
    while (left < right) {
        int currentSum = numbers[left] + numbers[right];
        if (currentSum == target) {
            return {left + 1, right + 1};
        }
        if (currentSum < target) {
            left++;
        } else {
            right--;
        }
    }
    return {};
}`,
    estimatedDuration: '45s',
    codeLength: 'short',
    tags: ['two-pointers', 'arrays', 'basics']
  },
  {
    id: 'cpp-algo-03',
    title: 'Sliding Window Longest Substring Without Repeats',
    language: 'cpp',
    mainTopic: 'cpp-algorithms',
    subtopic: 'Two Pointers & Sliding Window',
    difficulty: 'medium',
    statement: 'Determine the maximum length of a non-repeating substring with expanding and contracting window.',
    concepts: ['sliding window', 'hash table', 'std::max', 'substring'],
    code: `#include <string>
#include <vector>
#include <algorithm>

int lengthOfLongestSubstring(const std::string& s) {
    std::vector<int> lastIndex(128, -1);
    int maxLen = 0, start = 0;
    for (int i = 0; i < static_cast<int>(s.length()); ++i) {
        char ch = s[i];
        if (lastIndex[ch] >= start) {
            start = lastIndex[ch] + 1;
        }
        lastIndex[ch] = i;
        maxLen = std::max(maxLen, i - start + 1);
    }
    return maxLen;
}`,
    estimatedDuration: '60s',
    codeLength: 'medium',
    tags: ['sliding-window', 'strings', 'hashmap']
  },
  {
    id: 'cpp-algo-04',
    title: 'Prefix Sums Subarray Range Query',
    language: 'cpp',
    mainTopic: 'cpp-algorithms',
    subtopic: 'Prefix Sums & Frequency Counting',
    difficulty: 'easy',
    statement: 'Precompute cumulative running prefix sums to evaluate range queries in O(1) time.',
    concepts: ['prefix sums', 'cumulative sum', 'range queries'],
    code: `#include <vector>

class NumArray {
private:
    std::vector<int> prefix;
public:
    explicit NumArray(const std::vector<int>& nums) : prefix(nums.size() + 1, 0) {
        for (size_t i = 0; i < nums.size(); ++i) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }

    int sumRange(int left, int right) const {
        return prefix[right + 1] - prefix[left];
    }
};`,
    estimatedDuration: '45s',
    codeLength: 'short',
    tags: ['prefix-sum', 'arrays', 'math']
  },
  {
    id: 'cpp-algo-05',
    title: 'Greedy Interval Scheduling',
    language: 'cpp',
    mainTopic: 'cpp-algorithms',
    subtopic: 'Greedy Algorithms',
    difficulty: 'medium',
    statement: 'Select maximum non-overlapping intervals by sorting greedily by finish times.',
    concepts: ['greedy', 'interval scheduling', 'std::sort'],
    code: `#include <vector>
#include <algorithm>

struct Interval {
    int start;
    int end;
};

int maxNonOverlapping(std::vector<Interval>& intervals) {
    if (intervals.empty()) return 0;
    std::sort(intervals.begin(), intervals.end(), [](const Interval& a, const Interval& b) {
        return a.end < b.end;
    });

    int count = 1;
    int lastEnd = intervals[0].end;
    for (size_t i = 1; i < intervals.size(); ++i) {
        if (intervals[i].start >= lastEnd) {
            count++;
            lastEnd = intervals[i].end;
        }
    }
    return count;
}`,
    estimatedDuration: '60s',
    codeLength: 'medium',
    tags: ['greedy', 'sorting', 'intervals']
  },
  {
    id: 'cpp-algo-06',
    title: 'Backtracking Subsets Power Set',
    language: 'cpp',
    mainTopic: 'cpp-algorithms',
    subtopic: 'Backtracking & Permutations',
    difficulty: 'medium',
    statement: 'Generate all 2^N subsets of unique integers through recursive depth-first backtracking.',
    concepts: ['backtracking', 'recursion', 'subsets', 'power set'],
    code: `#include <vector>

void backtrack(int start, std::vector<int>& nums, std::vector<int>& path, std::vector<std::vector<int>>& result) {
    result.push_back(path);
    for (size_t i = start; i < nums.size(); ++i) {
        path.push_back(nums[i]);
        backtrack(i + 1, nums, path, result);
        path.pop_back();
    }
}

std::vector<std::vector<int>> subsets(std::vector<int>& nums) {
    std::vector<std::vector<int>> result;
    std::vector<int> path;
    backtrack(0, nums, path, result);
    return result;
}`,
    estimatedDuration: '65s',
    codeLength: 'medium',
    tags: ['backtracking', 'recursion', 'subsets']
  },
  {
    id: 'cpp-algo-07',
    title: 'Dynamic Programming 0/1 Knapsack Tabulation',
    language: 'cpp',
    mainTopic: 'cpp-algorithms',
    subtopic: 'Dynamic Programming (DP)',
    difficulty: 'hard',
    statement: 'Maximize total value of items fitting within a weight capacity using a 2D DP matrix table.',
    concepts: ['dynamic programming', 'knapsack', 'tabulation', 'memoization'],
    code: `#include <vector>
#include <algorithm>

int knapsack(int W, const std::vector<int>& wt, const std::vector<int>& val, int n) {
    std::vector<std::vector<int>> dp(n + 1, std::vector<int>(W + 1, 0));
    for (int i = 1; i <= n; ++i) {
        for (int w = 0; w <= W; ++w) {
            if (wt[i - 1] <= w) {
                dp[i][w] = std::max(dp[i - 1][w], val[i - 1] + dp[i - 1][w - wt[i - 1]]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][W];
}`,
    estimatedDuration: '70s',
    codeLength: 'medium',
    tags: ['dp', 'knapsack', 'tabulation']
  },
  {
    id: 'cpp-algo-08',
    title: 'Sieve of Eratosthenes Prime Generation',
    language: 'cpp',
    mainTopic: 'cpp-algorithms',
    subtopic: 'Bit Manipulation & Number Theory',
    difficulty: 'easy',
    statement: 'Generate all prime numbers up to N in O(N log log N) time using boolean sieve marking.',
    concepts: ['sieve of eratosthenes', 'primes', 'number theory'],
    code: `#include <vector>

std::vector<int> sievePrimes(int limit) {
    if (limit < 2) return {};
    std::vector<bool> isPrime(limit + 1, true);
    isPrime[0] = isPrime[1] = false;

    for (int p = 2; p * p <= limit; ++p) {
        if (isPrime[p]) {
            for (int multiple = p * p; multiple <= limit; multiple += p) {
                isPrime[multiple] = false;
            }
        }
    }

    std::vector<int> primes;
    for (int i = 2; i <= limit; ++i) {
        if (isPrime[i]) primes.push_back(i);
    }
    return primes;
}`,
    estimatedDuration: '55s',
    codeLength: 'medium',
    tags: ['primes', 'sieve', 'number-theory']
  }
];
