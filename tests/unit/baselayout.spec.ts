import { mount } from "@vue/test-utils";
import BaseLayout from "@/components/base/BaseLayout.vue";

interface Props {
  pageTitle: string;
  defaultBackLink?: string;
  scanActive?: boolean;
}

const title = 'test';

const factory = (props: Props) => {
  return mount(BaseLayout, {
    props,
  });
};

describe("BaseLayout", () => {
  it("render title handed in as prop", () => {
    const wrapper = factory({ pageTitle: title });
    expect(wrapper.get('[data-title="title"').text()).toBe(title);
  });

  it("render ion-content visible when no scan active", () => {
    const wrapper = factory({
      pageTitle: title,
      scanActive: false,
    });

    expect(wrapper.get('ion-content').isVisible()).toBe(true);
  });

  it('render ion-content not visible when scan is active', () => {
    const wrapper = factory({
      pageTitle: title,
      scanActive: true,
    });

    expect(wrapper.get('ion-content').isVisible()).toBe(false);
  });
});
