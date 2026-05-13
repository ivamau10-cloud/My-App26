import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  darkContainer: {
    backgroundColor: Colors.dark.background,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#e10600",
    marginBottom: 8,
  },
  logoSubtext: {
    fontSize: 16,
    color: Colors.light.icon,
    fontStyle: "italic",
  },
  darkLogoText: {
    color: "#e10600",
  },
  darkLogoSubtext: {
    color: Colors.dark.icon,
  },
  formSection: {
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 8,
  },
  darkLabel: {
    color: Colors.dark.text,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.light.text,
    backgroundColor: "#fff",
  },
  darkInput: {
    backgroundColor: "#222",
    color: Colors.dark.text,
    borderColor: "#444",
  },
  inputFocused: {
    borderColor: Colors.light.tint,
  },
  darkInputFocused: {
    borderColor: Colors.dark.tint,
  },
  button: {
    backgroundColor: "#e10600",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: Colors.light.tint,
    marginTop: 12,
  },
  secondaryButtonText: {
    color: Colors.light.tint,
  },
  darkSecondaryButtonText: {
    color: Colors.dark.tint,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: Colors.light.icon,
    fontSize: 14,
  },
  darkLinkText: {
    color: Colors.dark.icon,
  },
  linkButton: {
    marginLeft: 4,
  },
  linkButtonText: {
    color: Colors.light.tint,
    fontWeight: "600",
    fontSize: 14,
  },
  darkLinkButtonText: {
    color: Colors.dark.tint,
  },
  errorText: {
    color: "#dc2626",
    fontSize: 13,
    marginTop: 4,
    marginLeft: 4,
  },
  successText: {
    color: "#16a34a",
    fontSize: 13,
    marginTop: 4,
    marginLeft: 4,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  darkDividerLine: {
    backgroundColor: "#444",
  },
  dividerText: {
    marginHorizontal: 12,
    color: Colors.light.icon,
    fontSize: 14,
  },
  darkDividerText: {
    color: Colors.dark.icon,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerSection: {
    marginBottom: 30,
    marginTop: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 8,
  },
  darkGreeting: {
    color: Colors.dark.text,
  },
  email: {
    fontSize: 14,
    color: Colors.light.icon,
  },
  darkEmail: {
    color: Colors.dark.icon,
  },
  profileCard: {
    backgroundColor: Colors.light.tint,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  profileCardText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: "#dc2626",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
