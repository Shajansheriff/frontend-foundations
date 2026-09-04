---
title: "TypeScript"
order: 11
---

## What does TypeScript add to JavaScript?
**Answer:** TypeScript adds a static type system and compile-time tooling on top of JavaScript. The types are erased from the emitted JavaScript.
**Remember:** Types help before runtime; JavaScript still runs at runtime.

## `type` vs `interface`?
**Answer:** Both can describe object shapes. Interfaces support declaration merging and are naturally extendable; type aliases can also represent unions, intersections, primitives, tuples, and computed types.
**Remember:** Large overlap; use team conventions and the capability you need.

## `any` vs `unknown`?
**Answer:** `any` opts out of type checking for that value. `unknown` can hold anything but you must narrow or validate it before using it unsafely.
**Remember:** `unknown` forces proof before use.

## What is `never`?
**Answer:** `never` represents a value that cannot occur, such as a function that always throws or an impossible branch after exhaustive narrowing.
**Remember:** No possible value.

## What is `void`?
**Answer:** `void` commonly represents a function whose returned value is not intended to be used.
**Remember:** No meaningful return value.

## What is a union type?
**Answer:** A union means a value can be one of several types, such as `string | null`.
**Remember:** A OR B.

## What is an intersection type?
**Answer:** An intersection combines type requirements so a value must satisfy all intersected types.
**Remember:** A AND B.

## What is type narrowing?
**Answer:** Narrowing uses runtime checks and control flow to reduce a broad type to a more specific type that is safe to use.
**Remember:** Prove which member of the type you have.

## What is a type guard?
**Answer:** A type guard is a runtime check that TypeScript understands for narrowing, such as `typeof`, `instanceof`, `in`, discriminant checks, or a user-defined predicate.
**Remember:** Runtime evidence → narrower compile-time type.

## What are generics?
**Answer:** Generics let types and functions express relationships using type parameters instead of hard-coding one concrete type.
**Remember:** Write once while preserving specific type information.
```ts
type ApiResponse<T> = {
  data: T;
  error?: string;
};
```

## Why are generics better than `any` for reusable code?
**Answer:** Generics preserve and connect input/output types. `any` discards those guarantees and lets unsafe operations pass unchecked.
**Remember:** Generic keeps information; `any` throws it away.

## What does `keyof` do?
**Answer:** `keyof T` produces a union of the known property keys of type `T`.
**Remember:** Turn object keys into a type.

## What is indexed access typing?
**Answer:** `T[K]` accesses the type of property or properties `K` on type `T`, similar to property access at the type level.
**Remember:** Look up a property type.

## What is a mapped type?
**Answer:** A mapped type creates a new object type by iterating over a set of property keys and transforming their property definitions.
**Remember:** Map over keys at the type level.

## What is a conditional type?
**Answer:** A conditional type chooses one type or another based on a type relationship, written like `T extends U ? X : Y`.
**Remember:** Type-level if/else.

## What does `Partial<T>` do?
**Answer:** It creates a type with the same properties as `T` but marks each property optional.
**Remember:** All properties optional.

## What does `Pick<T, K>` do?
**Answer:** It creates a type containing only selected keys `K` from `T`.
**Remember:** Keep selected properties.

## What does `Omit<T, K>` do?
**Answer:** It creates a type based on `T` without the selected keys `K`.
**Remember:** Remove selected properties.

## What does `Record<K, V>` do?
**Answer:** It describes an object whose keys come from `K` and whose values have type `V`.
**Remember:** Typed key-value record.

## What is a discriminated union?
**Answer:** It is a union whose members contain a common literal property such as `type` or `status`, allowing safe narrowing based on that property.
**Remember:** One tag tells you which shape you have.

## What is an exhaustive check?
**Answer:** It verifies every member of a union has been handled, often by making the default/impossible branch require `never`.
**Remember:** Compiler warns when a new case is forgotten.

## Type annotation vs type assertion?
**Answer:** An annotation declares the expected type and is checked normally. An assertion tells TypeScript to treat a value as a type, so it can override inference and should be used only when you know more than the compiler.
**Remember:** Annotation asks the compiler; assertion tells the compiler.

## What is structural typing?
**Answer:** TypeScript compatibility is mainly based on the shape a value has rather than the explicit name of its type.
**Remember:** If the shape fits, the type can fit.

## What is type inference?
**Answer:** TypeScript often derives types from values and usage without requiring explicit annotations everywhere.
**Remember:** Let the compiler infer obvious types.
