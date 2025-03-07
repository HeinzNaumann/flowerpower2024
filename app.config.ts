// app.config.ts
export default defineAppConfig({
  ui: {
    primary: "primary",
    colors: {
      primary: "primary", // Escala basada en Nike
      neutral: "neutral", // Zinc para fondo y bordes
      flowerpowerLila: "flowerpower-lila",
    },
    modal: {
      slots: {
        content:
          "fixed bg-white divide-y divide-gray-200 flex flex-col focus:outline-none",
        header: "flex gap-1.5 p-4 sm:px-6 min-h-16 ",
        wrapper: "",
        body: "flex-1 overflow-y-auto p-4 sm:p-6",
        footer: "flex items-center gap-1.5 p-4 sm:px-6",
        title: "text-2xl font-medium text-gray-800 ",
        description: "mt-1 text-gray-600 text-sm text-center",
        close:
          "absolute top-4 end-4 text-gray-900 hover:text-primary-200 transition-colors cursor-pointer ", // Color oscuro + hover
      },
    },
    input: {
      slots: {
        root: "relative inline-flex items-center",
        base: "w-full bg-white border-[0.5px] border-primary-500 text-primary-700 rounded-md h-[50px] transition-all duration-200 ease-in-out flex focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm disabled:cursor-not-allowed disabled:opacity-75",
        leading: "absolute inset-y-0 start-0 flex items-center",
        leadingIcon: "shrink-0 text-primary-500",
        trailing: "absolute inset-y-0 end-0 flex items-center",
        trailingIcon: "shrink-0 text-primary-500",
      },
      variants: {
        variant: {
          outline:
            "text-primary-700 bg-white border-[0.5px] border-primary-500 rounded-md h-[50px] focus:border-primary-400 focus:ring-2 focus:ring-primary-400 shadow-sm",
          soft: "text-primary-700 bg-gray-100 border-gray-300 rounded-md h-[50px] focus:border-primary-400 focus:ring-2 focus:ring-primary-400 shadow-sm",
          subtle:
            "text-primary-700 bg-gray-200 border-gray-400 rounded-md h-[50px] focus:border-primary-400 focus:ring-2 focus:ring-primary-400 shadow-sm",
          ghost:
            "text-primary-700 bg-transparent hover:bg-gray-100 focus:bg-gray-200 border-none",
          none: "text-primary-700 bg-transparent",
        },
        color: {
          primary:
            "border-primary-500 text-primary-700 focus:border-primary-400 focus:ring-primary-400",
          secondary:
            "border-secondary-500 text-secondary-700 focus:border-secondary-400 focus:ring-secondary-400",
          success:
            "border-green-500 text-green-700 focus:border-green-400 focus:ring-green-400",
          info: "border-blue-500 text-blue-700 focus:border-blue-400 focus:ring-blue-400",
          warning:
            "border-yellow-500 text-yellow-700 focus:border-yellow-400 focus:ring-yellow-400",
          error:
            "border-red-500 text-red-700 focus:border-red-400 focus:ring-red-400",
          neutral:
            "border-gray-500 text-gray-700 focus:border-gray-400 focus:ring-gray-400",
        },
      },
      defaultVariants: {
        size: "md",
        color: "primary",
        variant: "outline",
      },
    },
  },
});
