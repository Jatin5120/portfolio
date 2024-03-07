import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';
import 'package:portfolio/views/views.dart';
import 'package:portfolio/widgets/widgets.dart';

class ContactForm extends StatelessWidget {
  const ContactForm({
    super.key,
    required this.state,
  });

  final ResponsiveState state;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: state == ResponsiveState.desktopLarge ? EdgeInsets.symmetric(horizontal: context.width * 0.05) : EdgeInsets.zero,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          if (state.isDesktop) ...[
            Flexible(
              flex: 2,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(24),
                child: Image.asset(AssetConstants.contact),
              ),
            ),
            Dimens.boxWidth16,
          ],
          Flexible(
            flex: 3,
            child: $ContactFields(isMobile: state == ResponsiveState.mobile),
          ),
        ],
      ),
    );
  }
}

class $ContactFields extends StatelessWidget {
  const $ContactFields({
    super.key,
    this.isMobile = false,
  });

  final bool isMobile;

  Widget get _gap => isMobile ? const SizedBox(height: 8) : const SizedBox(height: 16);

  @override
  Widget build(BuildContext context) {
    return GetBuilder<DashboardController>(
      id: Contact.updateId,
      builder: (controller) {
        return Form(
          key: controller.contactFormKey,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              if (isMobile) ...[
                InputField(
                  label: 'Name',
                  hint: 'Your Name',
                  controller: controller.nameController,
                  validator: AppValidators.nameValidator,
                ),
                _gap,
                InputField(
                  label: 'Email',
                  hint: 'your.email@gmail.com',
                  controller: controller.emailController,
                  validator: AppValidators.emailValidator,
                ),
              ] else
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Flexible(
                      child: InputField(
                        label: 'Name',
                        hint: 'Your Name',
                        controller: controller.nameController,
                        validator: AppValidators.nameValidator,
                      ),
                    ),
                    Dimens.boxWidth16,
                    Flexible(
                      child: InputField(
                        label: 'Email',
                        hint: 'your.email@gmail.com',
                        controller: controller.emailController,
                        validator: AppValidators.emailValidator,
                      ),
                    ),
                  ],
                ),
              _gap,
              InputField(
                label: 'Subject',
                hint: 'Looking to develop a cross-platform app',
                controller: controller.subjectController,
                validator: AppValidators.nameValidator,
              ),
              _gap,
              InputField(
                label: 'Message',
                hint: 'I want to make a large scale cross-platform application',
                minLines: 3,
                maxLines: 3,
                maxLength: 1000,
                controller: controller.messageController,
                validator: AppValidators.nameValidator,
              ),
              isMobile ? const SizedBox(height: 24) : const SizedBox(height: 32),
              AppButton(
                label: 'Submit',
                onTap: controller.submitContactRequest,
              ),
            ],
          ),
        );
      },
    );
  }
}
