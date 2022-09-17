import {mount} from '@vue/test-utils'
import Toolbar from "@/components/Toolbar";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe('Toolbar.vue', () => {
    it('Renders correctly', () => {
        expect.assertions(2);
        const wrapper = mount(Toolbar);

        expect(wrapper.find('.navbar-brand').text()).toBe('Vue Editor');
        expect(wrapper.find('.navbar-nav').text()).toBe('Save Create new Open document');
    })

    it('should be able to click on "create" button', function () {
        expect.assertions(1);
        const wrapper = mount(Toolbar);
        let createButton = wrapper.find('#create-document');

        createButton.trigger("click");

        expect(wrapper.find('#createNewModalName').text()).toBe('Create new document');
    });

    it('should be able to write in Create new document modal', function () {
        expect.assertions(2);
        const wrapper = mount(Toolbar);
        let createButton = wrapper.find('#create-document');

        createButton.trigger("click");
        const textInput = wrapper.find('input[type="text"]')
        textInput.setValue('new file name');

        expect(wrapper.find('#createNewModalName').text()).toBe('Create new document');
        expect(wrapper.find('input[type="text"]').element.value).toBe('new file name');
    });

    it('should be able to click on "open document"', function () {
        const mockMethod = jest.spyOn(Toolbar.methods, 'getAllDocuments');
        const wrapper = mount(Toolbar);

        wrapper.find('#open-document').trigger('click');

        expect(mockMethod).toHaveBeenCalled();
    });
});
