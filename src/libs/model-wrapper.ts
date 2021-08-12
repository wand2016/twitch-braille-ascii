import { computed } from "vue";

export function useModelWrapper<Props extends Record<string, any>>(
  props: Props,
  emit: any,
  name: keyof Props = "modelValue"
) {
  return computed({
    get() {
      return props[name];
    },
    set(value: any) {
      emit(`update:${name}`, value);
    },
  });
}
