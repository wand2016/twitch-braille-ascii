import { computed, SetupContext, WritableComputedRef } from "vue";

export function useModelWrapper<
  Props extends Record<string, unknown>,
  Name extends keyof Props
>(
  props: Props,
  emit: SetupContext["emit"],
  name: Name
): WritableComputedRef<Props[Name]> {
  return computed<Props[Name]>({
    get() {
      return props[name];
    },
    set(value: Props[Name]) {
      emit(`update:${name}`, value);
    },
  });
}
