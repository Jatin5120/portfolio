import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:portfolio/res/res.dart';
import 'package:portfolio/utils/utils.dart';

class AppButton extends StatelessWidget {
  const AppButton({
    super.key,
    this.onTap,
    this.onHover,
    required this.label,
  }) : _type = ButtonType.primary;

  const AppButton.secondary({
    super.key,
    this.onTap,
    this.onHover,
    required this.label,
  }) : _type = ButtonType.secondary;

  const AppButton.outlined({
    super.key,
    this.onTap,
    this.onHover,
    required this.label,
  }) : _type = ButtonType.outlined;

  final VoidCallback? onTap;
  final String label;
  final ButtonType _type;
  final void Function(bool)? onHover;

  static WidgetStateProperty<TextStyle?> _textStyle(BuildContext context) => WidgetStateProperty.all(
        context.textTheme.bodyMedium?.copyWith(
          fontWeight: FontWeight.w600,
        ),
      );

  static WidgetStateProperty<OutlinedBorder?> _shape() => WidgetStateProperty.all(
        RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
      );

  static WidgetStateProperty<double?> _elevation() => WidgetStateProperty.resolveWith(
        (states) => [
          WidgetState.hovered,
          WidgetState.focused,
          WidgetState.pressed,
        ].any((e) => states.contains(e))
            ? 4
            : 0,
      );

  @override
  Widget build(BuildContext context) => SizedBox(
        height: 48,
        width: double.maxFinite,
        child: switch (_type) {
          ButtonType.primary => _Primary(
              label: label,
              onTap: onTap,
              onHover: onHover,
            ),
          ButtonType.secondary => _Secondary(
              label: label,
              onTap: onTap,
              onHover: onHover,
            ),
          ButtonType.outlined => _Outlined(
              label: label,
              onTap: onTap,
              onHover: onHover,
            ),
        },
      );
}

class _Primary extends StatelessWidget {
  const _Primary({
    this.onTap,
    this.onHover,
    required this.label,
  });

  final VoidCallback? onTap;
  final void Function(bool)? onHover;
  final String label;

  @override
  Widget build(BuildContext context) => ElevatedButton(
        style: ButtonStyle(
          shape: AppButton._shape(),
          elevation: AppButton._elevation(),
          backgroundColor: WidgetStateColor.resolveWith(
            (states) {
              if (states.isDisabled) {
                return AppColors.cardDark;
              }
              return AppColors.primary;
            },
          ),
          foregroundColor: WidgetStateColor.resolveWith(
            (states) {
              if (states.isDisabled) {
                return AppColors.backgroundLight;
              }
              return AppColors.backgroundDark;
            },
          ),
          textStyle: AppButton._textStyle(context),
        ),
        onPressed: onTap,
        onHover: onHover,
        child: Text(
          label,
          textAlign: TextAlign.center,
        ),
      );
}

class _Secondary extends StatelessWidget {
  const _Secondary({
    this.onTap,
    this.onHover,
    required this.label,
  });

  final VoidCallback? onTap;
  final void Function(bool)? onHover;
  final String label;

  @override
  Widget build(BuildContext context) => ElevatedButton(
        style: ButtonStyle(
          shape: AppButton._shape(),
          elevation: AppButton._elevation(),
          backgroundColor: WidgetStateColor.resolveWith(
            (states) {
              return AppColors.cardDark;
            },
          ),
          foregroundColor: WidgetStateColor.resolveWith(
            (states) {
              if (states.isDisabled) {
                return AppColors.bodyDark;
              }
              return AppColors.primary;
            },
          ),
          textStyle: AppButton._textStyle(context),
        ),
        onPressed: onTap,
        onHover: onHover,
        child: Text(
          label,
          textAlign: TextAlign.center,
        ),
      );
}

class _Outlined extends StatelessWidget {
  const _Outlined({
    this.onTap,
    this.onHover,
    required this.label,
  });

  final VoidCallback? onTap;
  final void Function(bool)? onHover;
  final String label;

  @override
  Widget build(BuildContext context) => OutlinedButton(
        style: ButtonStyle(
          shape: AppButton._shape(),
          elevation: AppButton._elevation(),
          backgroundColor: WidgetStateColor.resolveWith(
            (states) {
              if (states.isDisabled) {
                return AppColors.cardDark;
              }
              return Colors.transparent;
            },
          ),
          foregroundColor: WidgetStateColor.resolveWith(
            (states) {
              if (states.isDisabled) {
                return AppColors.bodyDark;
              }
              return AppColors.primary;
            },
          ),
          side: WidgetStateProperty.resolveWith(
            (states) {
              if (states.isDisabled) {
                return BorderSide.none;
              }
              return const BorderSide(
                color: AppColors.primary,
                width: 1,
              );
            },
          ),
          textStyle: AppButton._textStyle(context),
        ),
        onPressed: onTap,
        onHover: onHover,
        child: Text(
          label,
          textAlign: TextAlign.center,
        ),
      );
}
