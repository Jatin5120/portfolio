import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/controllers/controllers.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';
import 'package:portfolio/views/views.dart';
import 'package:portfolio/widgets/widgets.dart';

class TestimonialView extends StatelessWidget {
  const TestimonialView({super.key});

  static const String route = AppRoutes.testimonial;

  static const String updateId = 'testimonial-view';

  @override
  Widget build(BuildContext context) {
    return GetBuilder<TestimonialController>(
      id: updateId,
      initState: (_) {
        Utility.setWebTitle('Testimonial - Jatin | Flutter Developer');
        // Get.find<TestimonialController>().showThankyou = false;
      },
      builder: (controller) {
        return Scaffold(
          appBar: const PreferredSize(
            preferredSize: Size.fromHeight(Dimens.navbarHeight),
            child: NavBar(),
          ),
          body: Center(
            child: Obx(
              () => controller.showThankyou
                  ? const ThankYouWidget()
                  : SingleChildScrollView(
                      padding: context.responsiveState.pagePadding,
                      child: ConstrainedBox(
                        constraints: const BoxConstraints(
                          maxWidth: 800,
                        ),
                        child: Form(
                          key: controller.formKey,
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              AppText(
                                StringConstants.testimonials,
                                style: context.textTheme.headlineMedium?.withTitleColor,
                                textAlign: TextAlign.center,
                              ),
                              const SizedBox(height: 8),
                              AppText(
                                StringConstants.addYourTestimonial,
                                style: context.textTheme.titleLarge?.withBodyColor,
                                textAlign: TextAlign.center,
                              ),
                              const SizedBox(height: 40),
                              if (context.responsiveState == ResponsiveState.mobile) ...[
                                InputField(
                                  label: 'Name',
                                  hint: 'Your Name',
                                  controller: controller.nameController,
                                  validator: AppValidators.nameValidator,
                                ),
                                const SizedBox(height: 16),
                                InputField(
                                  label: 'Designation/Relation',
                                  hint: 'CEO@XYZ / Best Friend',
                                  controller: controller.designationController,
                                  validator: AppValidators.nameValidator,
                                ),
                              ] else
                                Row(
                                  children: [
                                    Flexible(
                                      child: InputField(
                                        label: 'Name',
                                        hint: 'Your Name',
                                        controller: controller.nameController,
                                        validator: AppValidators.nameValidator,
                                      ),
                                    ),
                                    const SizedBox(width: 16),
                                    Flexible(
                                      child: InputField(
                                        label: 'Designation/Relation',
                                        hint: 'CEO@XYZ / Best Friend',
                                        controller: controller.designationController,
                                        validator: AppValidators.nameValidator,
                                      ),
                                    ),
                                  ],
                                ),
                              const SizedBox(height: 16),
                              InputField(
                                label: 'Feedback',
                                hint: 'Share a snapshot of your experience with me.',
                                controller: controller.messageController,
                                validator: AppValidators.nameValidator,
                                minLines: 3,
                                maxLines: 5,
                                maxLength: 500,
                              ),
                              const SizedBox(height: 40),
                              Align(
                                alignment: Alignment.centerLeft,
                                child: AppText(
                                  'Your avatar',
                                  style: context.textTheme.bodyLarge?.withTitleColor,
                                ),
                              ),
                              const SizedBox(height: 8),
                              const AvatarRow(),
                              const SizedBox(height: 40),
                              AppButton(
                                label: 'Submit',
                                onTap: controller.requestTestimonial,
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
            ),
          ),
        );
      },
    );
  }
}
