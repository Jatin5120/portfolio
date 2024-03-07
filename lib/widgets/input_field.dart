import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/utils/utils.dart';

class InputField extends StatelessWidget {
  const InputField({
    super.key,
    this.hint,
    required this.label,
    this.controller,
    this.validator,
    this.keyboardType,
    this.maxLength,
    this.minLines = 1,
    this.maxLines = 1,
    this.autofillHints,
  })  : assert(minLines > 0, 'minLines cannot be less than 1'),
        assert(maxLines > 0, 'maxLines cannot be less than 1'),
        assert(maxLines >= minLines, 'maxLines cannot be less than minLines');

  final String? hint;
  final String label;
  final TextEditingController? controller;
  final String? Function(String?)? validator;
  final TextInputType? keyboardType;
  final int? maxLength;
  final int minLines;
  final int maxLines;
  final Iterable<String>? autofillHints;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          label,
          style: context.textTheme.titleMedium?.withTitleColor,
        ),
        const SizedBox(height: 8),
        // Dimens.boxHeight8,
        TextFormField(
          controller: controller,
          autovalidateMode: AutovalidateMode.onUserInteraction,
          keyboardType: keyboardType,
          validator: validator,
          minLines: minLines,
          maxLines: maxLines,
          maxLength: maxLength,
          autofillHints: autofillHints,
          decoration: InputDecoration(
            hintText: hint ?? 'Enter $label',
            hintStyle: context.textTheme.bodyLarge?.copyWith(
              color: Colors.grey,
            ),
            alignLabelWithHint: true,
          ),
          style: context.textTheme.bodyLarge?.withBodyColor,
        ),
      ],
    );
  }
}
