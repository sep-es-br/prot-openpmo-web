/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { config, INITIAL_CONFIG, initialConfig, NEW_CONFIG } from './config';
import { MaskApplierService } from './mask-applier.service';
import { MaskDirective } from './mask.directive';
import { MaskPipe } from './mask.pipe';
var NgxMaskModule = /** @class */ (function () {
    function NgxMaskModule() {
    }
    /**
     * @param {?=} configValue
     * @return {?}
     */
    NgxMaskModule.forRoot = /**
     * @param {?=} configValue
     * @return {?}
     */
    function (configValue) {
        return {
            ngModule: NgxMaskModule,
            providers: [
                {
                    provide: NEW_CONFIG,
                    useValue: configValue
                },
                {
                    provide: INITIAL_CONFIG,
                    useValue: initialConfig
                },
                {
                    provide: config,
                    useFactory: _configFactory,
                    deps: [INITIAL_CONFIG, NEW_CONFIG]
                },
            ]
        };
    };
    /**
     * @param {?=} configValue
     * @return {?}
     */
    NgxMaskModule.forChild = /**
     * @param {?=} configValue
     * @return {?}
     */
    function (configValue) {
        return {
            ngModule: NgxMaskModule,
        };
    };
    NgxMaskModule.decorators = [
        { type: NgModule, args: [{
                    providers: [MaskApplierService],
                    exports: [MaskDirective, MaskPipe],
                    declarations: [MaskDirective, MaskPipe]
                },] }
    ];
    return NgxMaskModule;
}());
export { NgxMaskModule };
/**
 * \@internal
 * @param {?} initConfig
 * @param {?} configValue
 * @return {?}
 */
export function _configFactory(initConfig, configValue) {
    return (typeof configValue === 'function') ? configValue() : tslib_1.__assign({}, initConfig, configValue);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hc2subW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hc2svIiwic291cmNlcyI6WyJhcHAvbmd4LW1hc2svbmd4LW1hc2subW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBaUIsTUFBTSxVQUFVLENBQUM7QUFDNUYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFdkM7SUFBQTtJQWdDQSxDQUFDOzs7OztJQXpCZSxxQkFBTzs7OztJQUFyQixVQUFzQixXQUEyQjtRQUMvQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxVQUFVO29CQUNuQixRQUFRLEVBQUUsV0FBVztpQkFDdEI7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLGNBQWM7b0JBQ3ZCLFFBQVEsRUFBRSxhQUFhO2lCQUN4QjtnQkFDRDtvQkFDRSxPQUFPLEVBQUUsTUFBTTtvQkFDZixVQUFVLEVBQUUsY0FBYztvQkFDMUIsSUFBSSxFQUFFLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQztpQkFDbkM7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzs7OztJQUNhLHNCQUFROzs7O0lBQXRCLFVBQXVCLFdBQTJCO1FBQ2hELE9BQU87WUFDTCxRQUFRLEVBQUUsYUFBYTtTQUN4QixDQUFDO0lBQ0osQ0FBQzs7Z0JBL0JGLFFBQVEsU0FBQztvQkFDUixTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztvQkFDL0IsT0FBTyxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQztvQkFDbEMsWUFBWSxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQztpQkFDeEM7O0lBNEJELG9CQUFDO0NBQUEsQUFoQ0QsSUFnQ0M7U0EzQlksYUFBYTs7Ozs7OztBQWdDMUIsTUFBTSxVQUFVLGNBQWMsQ0FDN0IsVUFBeUIsRUFBRSxXQUFrRDtJQUM1RSxPQUFPLENBQUMsT0FBTyxXQUFXLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsc0JBQU0sVUFBVSxFQUFLLFdBQVcsQ0FBRSxDQUFDO0FBQ2pHLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25maWcsIElOSVRJQUxfQ09ORklHLCBpbml0aWFsQ29uZmlnLCBORVdfQ09ORklHLCBvcHRpb25zQ29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgTWFza0FwcGxpZXJTZXJ2aWNlIH0gZnJvbSAnLi9tYXNrLWFwcGxpZXIuc2VydmljZSc7XG5pbXBvcnQgeyBNYXNrRGlyZWN0aXZlIH0gZnJvbSAnLi9tYXNrLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNYXNrUGlwZSB9IGZyb20gJy4vbWFzay5waXBlJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbTWFza0FwcGxpZXJTZXJ2aWNlXSxcbiAgZXhwb3J0czogW01hc2tEaXJlY3RpdmUsIE1hc2tQaXBlXSxcbiAgZGVjbGFyYXRpb25zOiBbTWFza0RpcmVjdGl2ZSwgTWFza1BpcGVdXG59KVxuZXhwb3J0IGNsYXNzIE5neE1hc2tNb2R1bGUge1xuXG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChjb25maWdWYWx1ZT86IG9wdGlvbnNDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5neE1hc2tNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE5FV19DT05GSUcsXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZ1ZhbHVlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBJTklUSUFMX0NPTkZJRyxcbiAgICAgICAgICB1c2VWYWx1ZTogaW5pdGlhbENvbmZpZ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogY29uZmlnLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IF9jb25maWdGYWN0b3J5LFxuICAgICAgICAgIGRlcHM6IFtJTklUSUFMX0NPTkZJRywgTkVXX0NPTkZJR11cbiAgICAgICAgfSxcbiAgICAgIF1cbiAgICB9O1xuICB9XG4gIHB1YmxpYyBzdGF0aWMgZm9yQ2hpbGQoY29uZmlnVmFsdWU/OiBvcHRpb25zQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ3hNYXNrTW9kdWxlLFxuICAgIH07XG4gIH1cbn1cblxuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jb25maWdGYWN0b3J5XG4oaW5pdENvbmZpZzogb3B0aW9uc0NvbmZpZywgY29uZmlnVmFsdWU6IG9wdGlvbnNDb25maWcgfCAoKCkgPT4gb3B0aW9uc0NvbmZpZykpOiBGdW5jdGlvbiB8IG9wdGlvbnNDb25maWcge1xuICByZXR1cm4gKHR5cGVvZiBjb25maWdWYWx1ZSA9PT0gJ2Z1bmN0aW9uJykgPyBjb25maWdWYWx1ZSgpIDogeyAuLi5pbml0Q29uZmlnLCAuLi5jb25maWdWYWx1ZSB9O1xufVxuIl19