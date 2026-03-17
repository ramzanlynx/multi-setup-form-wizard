export let VALIDATED = false;

export const fieldSteps = {
  0: [
    "firstName",
    "lastName",
    "emailId",
    "userId",
    "country",
    "state",
    "city",
    "phoneNumber",
    "referenceCode",
  ],
  1: [
    "currentPassword",
    "confirmCurrentPassword",
    "newPassword",
    "confirmNewPassword",
  ],
};

const RULES = {
  // ── Section 1: Basic Details ──────────────
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 40,
    pattern: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, // letters, spaces, hyphens only
  },

  lastName: {
    required: true,
    minLength: 2,
    maxLength: 40,
    pattern: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/,
  },

  emailId: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  },

  userId: {
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_]+$/, // alphanumeric + underscore, no spaces
  },

  country: {
    required: true,
    minLength: 2,
    maxLength: 60,
  },

  state: {
    required: false, // optional — remove if your form requires it
    minLength: 2,
    maxLength: 60,
  },

  city: {
    required: false, // optional
    minLength: 2,
    maxLength: 60,
  },

  phoneNumber: {
    required: true,
    pattern: /^[\d\s\+\-\(\)]{7,20}$/,
  },

  referenceCode: {
    required: false, // optional referral code
    minLength: 4,
    maxLength: 30,
    pattern: /^[a-zA-Z0-9\-_]+$/,
  },

  // ── Section 2: Password Change ────────────
  currentPassword: {
    required: true,
    minLength: 8,
    maxLength: 64,
  },

  confirmCurrentPassword: {
    required: true,
    matchField: "currentPassword", // must match currentPassword
  },

  newPassword: {
    required: true,
    minLength: 8,
    maxLength: 64,
    pattern: /^(?=.*[A-Z])(?=.*[0-9]).+$/, // at least 1 uppercase + 1 number
    notMatchField: "currentPassword", // must be different from current password
  },

  confirmNewPassword: {
    required: true,
    matchField: "newPassword", // must match newPassword
  },
};

const MESSAGES = {
  firstName: {
    required: "First name is required",
    minLength: "First name must be at least 2 characters",
    pattern: "First name can only contain letters, spaces, or hyphens",
  },

  lastName: {
    required: "Last name is required",
    minLength: "Last name must be at least 2 characters",
    pattern: "Last name can only contain letters, spaces, or hyphens",
  },

  emailId: {
    required: "Email address is required",
    pattern: "Please enter a valid email address",
  },

  userId: {
    required: "User ID is required",
    minLength: "User ID must be at least 3 characters",
    maxLength: "User ID cannot exceed 20 characters",
    pattern: "Only letters, numbers, and underscores allowed",
  },

  country: {
    required: "Country is required",
    minLength: "Please enter a valid country name",
  },

  state: {
    minLength: "Please enter a valid state name",
  },

  city: {
    minLength: "Please enter a valid city name",
  },

  phoneNumber: {
    required: "Phone number is required",
    pattern: "Enter a valid phone number (7–20 digits)",
  },

  referenceCode: {
    pattern:
      "Reference code can only contain letters, numbers, hyphens, or underscores",
    minLength: "Reference code must be at least 4 characters",
  },

  currentPassword: {
    required: "Current password is required",
    minLength: "Password must be at least 8 characters",
  },

  confirmCurrentPassword: {
    required: "Please confirm your current password",
    matchField: "Passwords do not match",
  },

  newPassword: {
    required: "New password is required",
    minLength: "New password must be at least 8 characters",
    pattern: "Password must contain at least 1 uppercase letter and 1 number",
    notMatchField: "New password must be different from current password",
  },

  confirmNewPassword: {
    required: "Please confirm your new password",
    matchField: "Passwords do not match",
  },
};

const FieldState = Object.freeze({
  VALID: "valid",
  INVALID: "invalid",
  IDLE: "idle",
});

function getFieldValue(fieldId, rules) {
  const $el = $("#" + fieldId);
  return !!rules.checkbox ? $el.prop("checked") : $el.val().trim();
}

function getValidationError(fieldId, value, rules, msgs) {
  // Required check
  if (rules.required && !value) {
    return msgs.required ?? "This field is required";
  }

  // Skip remaining checks if field is empty and not required
  if (!value) return null;

  // Cross-field NOT match check FIRST (new password must be different from current)
  if (rules.notMatchField) {
    const otherValue = $("#" + rules.notMatchField).val()?.trim();
    if (otherValue && value === otherValue) {
      return msgs.notMatchField ?? "Must be different from current password";
    }
  }

  // Pattern check (not applicable to checkboxes)
  if (rules.pattern && !rules.checkbox) {
    if (!rules.pattern.test(value)) {
      return msgs.pattern ?? "Invalid format";
    }
  }

  // Min length check
  if (rules.minLength && value.length < rules.minLength) {
    return msgs.minLength ?? `Minimum ${rules.minLength} characters required`;
  }

  // Max length check
  if (rules.maxLength && value.length > rules.maxLength) {
    return msgs.maxLength ?? `Maximum ${rules.maxLength} characters allowed`;
  }

  // Cross-field match check (e.g. confirm password)
  if (rules.matchField) {
    // Get the other value
    const otherValue = $("#" + rules.matchField)
      .val()
      .trim();

    if (value !== otherValue) {
      return msgs.matchField ?? "Fields do not match";
    }
  }

  return null; // ✅ all checks passed
}

function setFieldState(fieldId, state, message = "") {
  const $el = $("#" + fieldId);
  const $msg = $("#" + fieldId + "-msg");
  // const $icon = $("#" + fieldId + "-icon");

  // Always reset first — clean slate
  $el.removeClass("valid invalid");
  $msg.removeClass("show error success").text("");
  // if ($icon.length) $icon.removeClass("show").text("");

  if (state === FieldState.VALID) {
    return;
  }

  if (state === FieldState.INVALID) {
    $el.addClass("invalid");
    $msg.addClass("show error").html("⚠ " + message);
    // if ($icon.length) $icon.addClass("show").text("✗");
    return;
  }
}

export function validate(fieldId) {
  // Guard: skip unknown fields gracefully
  const rules = RULES[fieldId];
  const msgs = MESSAGES[fieldId];
  if (!rules || !msgs) {
    console.warn(`validate() — no rules found for field: "${fieldId}"`);
    return true;
  }

  const value = getFieldValue(fieldId, rules);
  const error = getValidationError(fieldId, value, rules, msgs);

  if (error) {
    setFieldState(fieldId, FieldState.INVALID, error);
    return false;
  }

  // Only show "valid" state if field has a value (don't green-tick empty optional fields)
  const state = value ? FieldState.VALID : FieldState.IDLE;
  setFieldState(fieldId, state);
  return true;
}

// ── Debounce utility ───────────────────────────────────────────────
function debounce(fn, delay = 300) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// ── Debounced validation on input ────────────────────────────────
const debouncedValidate = debounce(function () {
  const fieldId = $(this).attr("id");
  if (fieldId && typeof validate === "function" && RULES[fieldId]) {
    validate(fieldId);
  }
}, 200);

$(document).on("input", ".form-control", debouncedValidate);
