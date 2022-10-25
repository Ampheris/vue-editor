import {mount, createLocalVue} from '@vue/test-utils'
import Toolbar from "@/components/Toolbar";


afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe('Toolbar.vue', () => {
    it('Renders correctly', () => {
        expect.assertions(2);
        const wrapper = mount(Toolbar, {
            computed: {
                loggedIn() {
                    return true;
                },
                currentUser() {
                    return '23123235134';
                },
            }
        });

        expect(wrapper.find('.navbar-brand').text()).toBe('Vue Editor');
        expect(wrapper.find('.navbar-nav').text()).toBe('Create new Open document Download PDF Send invite Logout');
    })

    describe('Checks that the toolbar icons work', () => {
        it('should be able to click on "create" button', function () {
            expect.assertions(1);
            const wrapper = mount(Toolbar, {
                computed: {
                    loggedIn() {
                        return true;
                    },
                    currentUser() {
                        return '23123235134';
                    },
                }
            });

            let createButton = wrapper.find('#create-document');

            createButton.trigger("click");

            expect(wrapper.find('#createNewModalName').text()).toBe('Create new document');
        });

        it('should be able to write in Create new document modal', function () {
            expect.assertions(2);
            const wrapper = mount(Toolbar, {
                computed: {
                    loggedIn() {
                        return true;
                    },
                    currentUser() {
                        return '23123235134';
                    },
                }
            });

            let createButton = wrapper.find('#create-document');

            createButton.trigger("click");
            const textInput = wrapper.find('input[type="text"]')
            textInput.setValue('new file name');

            expect(wrapper.find('#createNewModalName').text()).toBe('Create new document');
            expect(wrapper.find('input[type="text"]').element.value).toBe('new file name');
        });

        it('should be able to click on "open document"', function () {
            const mockMethod = jest.spyOn(Toolbar.methods, 'getAllDocuments');
            const wrapper = mount(Toolbar, {
                computed: {
                    loggedIn() {
                        return true;
                    },
                    currentUser() {
                        return '23123235134';
                    },
                }
            });

            wrapper.find('#open-document').trigger('click');

            expect(mockMethod).toHaveBeenCalled();
        });
    })

    describe('Download PDF feature', () => {
        it('should be able to download document as pdf', function () {
            expect.assertions(2);
            const mockMethod = jest.spyOn(Toolbar.methods, 'downloadPDF');

            const wrapper = mount(Toolbar, {
                computed: {
                    loggedIn() {
                        return true;
                    },
                    currentUser() {
                        return '23123235134';
                    },
                }
            });

            let downloadButton = wrapper.find('#downloadPDF');
            expect(downloadButton).toBeDefined();

            downloadButton.trigger('click');
            expect(mockMethod).toHaveBeenCalled();
        });
    })


    describe('Send email feature', () => {
        it('should open the send invitation modal', function () {
            expect.assertions(2);

            const wrapper = mount(Toolbar, {
                computed: {
                    loggedIn() {
                        return true;
                    },
                    currentUser() {
                        return '23123235134';
                    },
                }
            });

            let sendInvite = wrapper.find('#sendInvite');
            expect(sendInvite.text()).toBe('Send invite');

            sendInvite.trigger('click');

            expect(wrapper.find('#sendInviteModalTitle').text()).toBe('Send invite to your document');
        });

        it('should call the send email function', function () {
            expect.assertions(2);
            const mockMethod = jest.spyOn(Toolbar.methods, 'sendEmail');

            const wrapper = mount(Toolbar, {
                computed: {
                    loggedIn() {
                        return true;
                    },
                    currentUser() {
                        return {
                            "_id": "63383b81b12ac03edbe37c15",
                            "email": "ampheris@gmail.com",
                            "token": "tokentoken"
                        };
                    },
                }
            });

            let sendInvite = wrapper.find('#sendInvite');
            sendInvite.trigger('click');

            let input = wrapper.find('input[type="text"]')
            expect(input).toBeDefined();

            expect(wrapper.find('button[type="submit"]')).toBeDefined();
        });
    });
});
