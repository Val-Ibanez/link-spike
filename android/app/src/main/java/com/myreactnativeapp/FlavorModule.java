package com.myreactnativeapp;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import java.util.Map;
import java.util.HashMap;

public class FlavorModule extends ReactContextBaseJavaModule {
    public FlavorModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "FlavorModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> constants = new HashMap<>();
        try {
            String flavor = com.myreactnativeapp.BuildConfig.FLAVOR;
            System.out.println("🔍 FlavorModule.getConstants() - BuildConfig.FLAVOR: " + flavor);
            constants.put("FLAVOR", flavor);
        } catch (Exception e) {
            System.err.println("❌ Error en FlavorModule.getConstants(): " + e.getMessage());
            constants.put("FLAVOR", "bancoEntreRios"); // fallback
        }
        return constants;
    }

    @ReactMethod
    public void getFlavor(Promise promise) {
        try {
            // Importar BuildConfig del flavor actual
            String flavor = com.myreactnativeapp.BuildConfig.FLAVOR;
            System.out.println("🔍 FlavorModule.getFlavor() llamado - BuildConfig.FLAVOR: " + flavor);
            promise.resolve(flavor);
        } catch (Exception e) {
            System.err.println("❌ Error en FlavorModule.getFlavor(): " + e.getMessage());
            promise.reject("ERROR", e);
        }
    }
}
