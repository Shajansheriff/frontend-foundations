---
title: "TypeScript"
order: 11
---
## What does TypeScript add to JavaScript?
**Answer:** TypeScript adds a static type system and compile-time tooling on top of JavaScript. The types are erased from the emitted JavaScript.
**Connect:** TypeScript adds a static type system and tooling layer over JavaScript. Types are erased when code is emitted, so runtime validation is still required for data crossing untrusted boundaries such as network responses or user input.
**Example:** Typing an API response helps your editor/compiler, but the server can still send malformed JSON at runtime unless you validate it.
**Interview:** TypeScript adds a static type system and compile-time tooling on top of JavaScript. The types are erased from the emitted JavaScript. TypeScript adds a static type system and tooling layer over JavaScript. The key idea is: Types help before runtime; JavaScript still runs at runtime.
**Remember:** Types help before runtime; JavaScript still runs at runtime.

## `type` vs `interface`?
**Answer:** Both can describe object shapes. Interfaces support declaration merging and are naturally extendable; type aliases can also represent unions, intersections, primitives, tuples, and computed types.
**Connect:** Both can describe object shapes and often work interchangeably. Interfaces have declaration merging and are naturally extensible; type aliases can also represent unions, intersections, tuples, primitives, and mapped/conditional compositions. Pick a team convention, then use features that fit the model.
**Example:** Use either for a component props object; use a type alias for `type Status = 'idle' | 'loading' | 'error'`.
**Interview:** Both can describe object shapes. Interfaces support declaration merging and are naturally extendable; type aliases can also represent unions, intersections, primitives, tuples, and computed types. Both can describe object shapes and often work interchangeably.
**Remember:** Large overlap; use team conventions and the capability you need.

## `any` vs `unknown`?
**Answer:** `any` opts out of type checking for that value. `unknown` can hold anything but you must narrow or validate it before using it unsafely.
**Connect:** `any` opts out of type safety and lets unsafe operations flow through the program. `unknown` says 'I do not know this type yet' and forces you to narrow/check it before use, which is ideal for untrusted boundaries.
**Example:** A caught error or parsed external payload can start as `unknown`; check `typeof`/schema before accessing properties.
**Interview:** `any` opts out of type checking for that value. `unknown` can hold anything but you must narrow or validate it before using it unsafely. `any` opts out of type safety and lets unsafe operations flow through the program. The key idea is: `unknown` forces proof before use.
**Remember:** `unknown` forces proof before use.

## What is `never`?
**Answer:** `never` represents a value that cannot occur, such as a function that always throws or an impossible branch after exhaustive narrowing.
**Connect:** `never` represents values that cannot exist or code paths that cannot complete normally. It becomes powerful for exhaustiveness because if all union cases were handled, the remaining value should narrow to never.
**Example:** In a switch over every `status` variant, the default branch can assign the leftover value to `never` so adding a new variant causes a compile error.
**Interview:** `never` represents a value that cannot occur, such as a function that always throws or an impossible branch after exhaustive narrowing. `never` represents values that cannot exist or code paths that cannot complete normally. The key idea is: No possible value.
**Remember:** No possible value.

## What is `void`?
**Answer:** `void` commonly represents a function whose returned value is not intended to be used.
**Connect:** `void` expresses that a function's useful return value is ignored/not provided. In callback typing, a function returning a value can often still satisfy a `() => void` target because the caller promises not to use that returned value.
**Example:** An event handler may be typed `(event) => void` because React does not use a business result from the handler.
**Interview:** `void` commonly represents a function whose returned value is not intended to be used. `void` expresses that a function's useful return value is ignored/not provided. The key idea is: No meaningful return value.
**Remember:** No meaningful return value.

## What is a union type?
**Answer:** A union means a value can be one of several types, such as `string | null`.
**Connect:** A union means a value may be one of several alternatives. Useful unions pair alternatives with narrowing so each branch gets the correct type, rather than making many unrelated fields optional.
**Example:** `type Result = Success | Failure` lets code narrow based on a discriminant such as `result.ok`.
**Interview:** A union means a value can be one of several types, such as `string | null`. A union means a value may be one of several alternatives. The key idea is: A OR B.
**Remember:** A OR B.

## What is an intersection type?
**Answer:** An intersection combines type requirements so a value must satisfy all intersected types.
**Connect:** An intersection requires a value to satisfy all combined type constraints at once. It is useful for composing capabilities/shapes, but intersecting incompatible fields can produce impossible (`never`) properties.
**Example:** `type Admin = User & {permissions: string[]}` requires all User fields plus permissions.
**Interview:** An intersection combines type requirements so a value must satisfy all intersected types. An intersection requires a value to satisfy all combined type constraints at once. The key idea is: A AND B.
**Remember:** A AND B.

## What is type narrowing?
**Answer:** Narrowing uses runtime checks and control flow to reduce a broad type to a more specific type that is safe to use.
**Connect:** Narrowing is TypeScript using runtime-observable checks/control flow to move from a broad type to a more specific one. This is how `unknown` and unions become safely usable inside branches.
**Example:** After `if (typeof value === 'string')`, TypeScript knows `value` supports string methods in that branch.
**Interview:** Narrowing uses runtime checks and control flow to reduce a broad type to a more specific type that is safe to use. Narrowing is TypeScript using runtime-observable checks/control flow to move from a broad type to a more specific one. The key idea is: Prove which member of the type you have.
**Remember:** Prove which member of the type you have.

## What is a type guard?
**Answer:** A type guard is a runtime check that TypeScript understands for narrowing, such as `typeof`, `instanceof`, `in`, discriminant checks, or a user-defined predicate.
**Connect:** A type guard is a check that gives TypeScript evidence about a value's type. Built-ins include `typeof`, `instanceof`, `in`, and equality/discriminant checks; user-defined guards can encode reusable checks.
**Example:** `function isUser(x: unknown): x is User { ... }` lets callers narrow `x` after the function returns true, provided the check is trustworthy.
**Interview:** A type guard is a runtime check that TypeScript understands for narrowing, such as `typeof`, `instanceof`, `in`, discriminant checks, or a user-defined predicate. A type guard is a check that gives TypeScript evidence about a value's type. The key idea is: Runtime evidence → narrower compile-time type.
**Remember:** Runtime evidence → narrower compile-time type.

## What are generics?
**Answer:** Generics let types and functions express relationships using type parameters instead of hard-coding one concrete type.
**Connect:** Generics let types depend on other types passed in, preserving relationships instead of throwing information away. Think of a generic as a type parameter: the caller supplies a concrete type and the reusable abstraction carries it through input/output positions.
**Example:** `function first<T>(items:T[]):T|undefined` returns the same element type the caller put into the array.
**Interview:** Generics let types and functions express relationships using type parameters instead of hard-coding one concrete type. Generics let types depend on other types passed in, preserving relationships instead of throwing information away. The key idea is: Write once while preserving specific type information.
**Remember:** Write once while preserving specific type information.
```ts
type ApiResponse<T> = {
  data: T;
  error?: string;
};
```

## Why are generics better than `any` for reusable code?
**Answer:** Generics preserve and connect input/output types. `any` discards those guarantees and lets unsafe operations pass unchecked.
**Connect:** `any` forgets the relationship between inputs and outputs; generics preserve it while keeping the implementation reusable. That means callers get precise autocomplete/errors without duplicating the function for every concrete type.
**Example:** `identity<any>(42)` tells you nothing useful about the output; `identity<T>(value:T):T` lets TypeScript infer `number`.
**Interview:** Generics preserve and connect input/output types. `any` discards those guarantees and lets unsafe operations pass unchecked. `any` forgets the relationship between inputs and outputs; generics preserve it while keeping the implementation reusable. The key idea is: Generic keeps information; `any` throws it away.
**Remember:** Generic keeps information; `any` throws it away.

## What does `keyof` do?
**Answer:** `keyof T` produces a union of the known property keys of type `T`.
**Connect:** `keyof T` produces a union of property keys known on `T`. Combined with generics/indexed access, it lets APIs accept only valid property names while preserving the corresponding value type.
**Example:** `get<T, K extends keyof T>(obj:T, key:K): T[K]` rejects keys that do not exist on the object.
**Interview:** `keyof T` produces a union of the known property keys of type `T`. `keyof T` produces a union of property keys known on `T`. The key idea is: Turn object keys into a type.
**Remember:** Turn object keys into a type.

## What is indexed access typing?
**Answer:** `T[K]` accesses the type of property or properties `K` on type `T`, similar to property access at the type level.
**Connect:** Indexed access types use `T[K]` at the type level to look up the type of one or more properties. This avoids duplicating a nested property type that could drift from the source model.
**Example:** If `User['id']` is `string`, a helper parameter can reuse that exact type instead of independently writing `string`.
**Interview:** `T[K]` accesses the type of property or properties `K` on type `T`, similar to property access at the type level. Indexed access types use `T[K]` at the type level to look up the type of one or more properties. The key idea is: Look up a property type.
**Remember:** Look up a property type.

## What is a mapped type?
**Answer:** A mapped type creates a new object type by iterating over a set of property keys and transforming their property definitions.
**Connect:** A mapped type iterates over a union of property keys and constructs a new property shape. Utility types such as Partial/Readonly are built from this idea.
**Example:** Map `keyof User` to booleans to produce a type representing which User fields are dirty.
**Interview:** A mapped type creates a new object type by iterating over a set of property keys and transforming their property definitions. A mapped type iterates over a union of property keys and constructs a new property shape. The key idea is: Map over keys at the type level.
**Remember:** Map over keys at the type level.

## What is a conditional type?
**Answer:** A conditional type chooses one type or another based on a type relationship, written like `T extends U ? X : Y`.
**Connect:** Conditional types choose one type or another based on a type relationship (`T extends U ? X : Y`). With generics they can distribute over unions and power advanced inference/utilities, but overuse can make types hard to read.
**Example:** A utility can extract an array element type: `T extends (infer U)[] ? U : T`.
**Interview:** A conditional type chooses one type or another based on a type relationship, written like `T extends U ? X : Y`. Conditional types choose one type or another based on a type relationship (`T extends U ? X : Y`). The key idea is: Type-level if/else.
**Remember:** Type-level if/else.

## What does `Partial<T>` do?
**Answer:** It creates a type with the same properties as `T` but marks each property optional.
**Connect:** Partial maps every property of T to optional while preserving each property's value type. It is useful for patch/update shapes, but remember optionality alone does not validate business rules for which combinations are legal.
**Example:** `Partial<User>` can represent a draft update containing only `{displayName:'Sha'}`.
**Interview:** It creates a type with the same properties as `T` but marks each property optional. Partial maps every property of T to optional while preserving each property's value type. The key idea is: All properties optional.
**Remember:** All properties optional.

## What does `Pick<T, K>` do?
**Answer:** It creates a type containing only selected keys `K` from `T`.
**Connect:** Pick constructs a type containing only selected keys from another type. It keeps the selected property types linked to the original model.
**Example:** `Pick<User, 'id' | 'name'>` is a compact summary shape that stays aligned if User's id type changes.
**Interview:** It creates a type containing only selected keys `K` from `T`. Pick constructs a type containing only selected keys from another type. The key idea is: Keep selected properties.
**Remember:** Keep selected properties.

## What does `Omit<T, K>` do?
**Answer:** It creates a type based on `T` without the selected keys `K`.
**Connect:** Omit starts from a type and removes selected keys. It is useful for derived inputs, though sometimes defining a purpose-specific domain type directly is clearer than subtracting many fields from a large entity.
**Example:** `Omit<User, 'id' | 'createdAt'>` can model fields accepted before the server creates those fields.
**Interview:** It creates a type based on `T` without the selected keys `K`. Omit starts from a type and removes selected keys. The key idea is: Remove selected properties.
**Remember:** Remove selected properties.

## What does `Record<K, V>` do?
**Answer:** It describes an object whose keys come from `K` and whose values have type `V`.
**Connect:** Record constructs an object type whose allowed keys are K and whose values are V. With a finite key union, it can require every known key to be present.
**Example:** `Record<Status, number>` can require counts for `idle`, `loading`, `success`, and `error`.
**Interview:** It describes an object whose keys come from `K` and whose values have type `V`. Record constructs an object type whose allowed keys are K and whose values are V. The key idea is: Typed key-value record.
**Remember:** Typed key-value record.

## What is a discriminated union?
**Answer:** It is a union whose members contain a common literal property such as `type` or `status`, allowing safe narrowing based on that property.
**Connect:** A discriminated union gives each variant a shared literal field such as `type` or `status`. Checking that field narrows the rest of the object cleanly, making impossible combinations harder to represent.
**Example:** `{status:'success', data:User} | {status:'error', error:Error}` means success cannot accidentally exist without data.
**Interview:** It is a union whose members contain a common literal property such as `type` or `status`, allowing safe narrowing based on that property. A discriminated union gives each variant a shared literal field such as `type` or `status`. The key idea is: One tag tells you which shape you have.
**Remember:** One tag tells you which shape you have.

## What is an exhaustive check?
**Answer:** It verifies every member of a union has been handled, often by making the default/impossible branch require `never`.
**Connect:** Exhaustiveness uses narrowing plus `never` to make the compiler prove every variant was handled. It turns adding a new union member into compile errors at switches that need new behavior.
**Example:** Add `status:'cancelled'` and an exhaustive switch immediately points to places that forgot the new state.
**Interview:** It verifies every member of a union has been handled, often by making the default/impossible branch require `never`. Exhaustiveness uses narrowing plus `never` to make the compiler prove every variant was handled. The key idea is: Compiler warns when a new case is forgotten.
**Remember:** Compiler warns when a new case is forgotten.

## Type annotation vs type assertion?
**Answer:** An annotation declares the expected type and is checked normally. An assertion tells TypeScript to treat a value as a type, so it can override inference and should be used only when you know more than the compiler.
**Connect:** An annotation tells TypeScript what type a declaration must satisfy and is checked against the assigned value. An assertion tells the compiler to treat a value as a type, potentially overriding its caution; assertions therefore deserve more skepticism.
**Example:** Prefer `const user: User = value` when possible; `value as User` can silence a mismatch without making runtime data actually valid.
**Interview:** An annotation declares the expected type and is checked normally. An assertion tells TypeScript to treat a value as a type, so it can override inference and should be used only when you know more than the compiler. An annotation tells TypeScript what type a declaration must satisfy and is checked against the assigned value.
**Remember:** Annotation asks the compiler; assertion tells the compiler.

## What is structural typing?
**Answer:** TypeScript compatibility is mainly based on the shape a value has rather than the explicit name of its type.
**Connect:** TypeScript mostly cares about a value's shape rather than the declared name of its class/interface. If it has the required compatible members, it can be assignable, which is convenient for JavaScript-style composition but can occasionally allow accidentally compatible shapes.
**Example:** A plain object with `{name:string}` can satisfy an interface requiring `{name:string}` even if it never explicitly declared `implements` that interface.
**Interview:** TypeScript compatibility is mainly based on the shape a value has rather than the explicit name of its type. TypeScript mostly cares about a value's shape rather than the declared name of its class/interface. The key idea is: If the shape fits, the type can fit.
**Remember:** If the shape fits, the type can fit.

## What is type inference?
**Answer:** TypeScript often derives types from values and usage without requiring explicit annotations everywhere.
**Connect:** Inference lets TypeScript derive types from values, return expressions, control flow, and generic relationships. Good TypeScript usually annotates important public boundaries and lets local obvious types be inferred, avoiding noisy duplication.
**Example:** `const count = 1` already infers number; a exported function's parameters/API contract often deserve explicit types.
**Interview:** TypeScript often derives types from values and usage without requiring explicit annotations everywhere. Inference lets TypeScript derive types from values, return expressions, control flow, and generic relationships. The key idea is: Let the compiler infer obvious types.
**Remember:** Let the compiler infer obvious types.
