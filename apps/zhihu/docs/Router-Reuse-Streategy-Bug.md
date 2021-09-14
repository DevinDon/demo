# Angular Router 的复用策略问题

极其复杂。

## 1 关键逻辑一

```typescript
function createNode(routeReuseStrategy, curr, prevState) {
  // reuse an activated route that is currently displayed on the screen
  if (prevState && routeReuseStrategy.shouldReuseRoute(curr.value, prevState.value.snapshot)) {
    const value = prevState.value;
    value._futureSnapshot = curr.value;
    const children = createOrReuseChildren(routeReuseStrategy, curr, prevState);
    return new TreeNode(value, children);
    // retrieve an activated route that is used to be displayed, but is not currently displayed
  }
  else {
    const detachedRouteHandle = routeReuseStrategy.retrieve(curr.value);
    if (detachedRouteHandle) {
      const tree = detachedRouteHandle.route;
      setFutureSnapshotsOfActivatedRoutes(curr, tree);
      return tree;
    }
    else {
      const value = createActivatedRoute(curr.value);
      const children = curr.children.map(c => createNode(routeReuseStrategy, c));
      return new TreeNode(value, children);
    }
  }
}
function setFutureSnapshotsOfActivatedRoutes(curr, result) {
  if (curr.value.routeConfig !== result.value.routeConfig) {
    throw new Error('Cannot reattach ActivatedRouteSnapshot created from a different route');
  }
  if (curr.children.length !== result.children.length) {
    throw new Error('Cannot reattach ActivatedRouteSnapshot with a different number of children');
  }
  result.value._futureSnapshot = curr.value;
  for (let i = 0; i < curr.children.length; ++i) {
    setFutureSnapshotsOfActivatedRoutes(curr.children[i], result.children[i]);
  }
}
```

## 2 关键逻辑 二

```typescript
activateRoutes(futureNode, currNode, parentContexts) {
  const future = futureNode.value;
  const curr = currNode ? currNode.value : null;
  advanceActivatedRoute(future);
  // reusing the node
  if (future === curr) {
    if (future.component) {
      // If we have a normal route, we need to go through an outlet.
      const context = parentContexts.getOrCreateContext(future.outlet);
      this.activateChildRoutes(futureNode, currNode, context.children);
    }
    else {
      // if we have a componentless route, we recurse but keep the same outlet map.
      this.activateChildRoutes(futureNode, currNode, parentContexts);
    }
  }
  else {
    if (future.component) {
      // if we have a normal route, we need to place the component into the outlet and recurse.
      const context = parentContexts.getOrCreateContext(future.outlet);
      if (this.routeReuseStrategy.shouldAttach(future.snapshot)) {
        const stored = this.routeReuseStrategy.retrieve(future.snapshot);
        this.routeReuseStrategy.store(future.snapshot, null);
        context.children.onOutletReAttached(stored.contexts);
        context.attachRef = stored.componentRef;
        context.route = stored.route.value;
        if (context.outlet) {
          // Attach right away when the outlet has already been instantiated
          // Otherwise attach from `RouterOutlet.ngOnInit` when it is instantiated
          context.outlet.attach(stored.componentRef, stored.route.value);
        }
        advanceActivatedRouteNodeAndItsChildren(stored.route);
      }
      else {
        const config = parentLoadedConfig(future.snapshot);
        const cmpFactoryResolver = config ? config.module.componentFactoryResolver : null;
        context.attachRef = null;
        context.route = future;
        context.resolver = cmpFactoryResolver;
        if (context.outlet) {
          // Activate the outlet when it has already been instantiated
          // Otherwise it will get activated from its `ngOnInit` when instantiated
          context.outlet.activateWith(future, cmpFactoryResolver);
        }
        this.activateChildRoutes(futureNode, null, context.children);
      }
    }
    else {
      // if we have a componentless route, we recurse but keep the same outlet map.
      this.activateChildRoutes(futureNode, null, parentContexts);
    }
  }
}
```
