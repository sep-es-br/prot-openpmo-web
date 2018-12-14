/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { config, INITIAL_CONFIG, initialConfig, NEW_CONFIG } from './config';
import { MaskApplierService } from './mask-applier.service';
import { MaskDirective } from './mask.directive';
import { MaskPipe } from './mask.pipe';
export class NgxMaskModule {
    /**
     * @param {?=} configValue
     * @return {?}
     */
    static forRoot(configValue) {
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
    }
    /**
     * @param {?=} configValue
     * @return {?}
     */
    static forChild(configValue) {
        return {
            ngModule: NgxMaskModule,
        };
    }
}
NgxMaskModule.decorators = [
    { type: NgModule, args: [{
                providers: [MaskApplierService],
                exports: [MaskDirective, MaskPipe],
                declarations: [MaskDirective, MaskPipe]
            },] }
];
/**
 * \@internal
 * @param {?} initConfig
 * @param {?} configValue
 * @return {?}
 */
export function _configFactory(initConfig, configValue) {
    return (typeof configValue === 'function') ? configValue() : Object.assign({}, initConfig, configValue);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hc2subW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hc2svIiwic291cmNlcyI6WyJhcHAvbmd4LW1hc2svbmd4LW1hc2subW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFpQixNQUFNLFVBQVUsQ0FBQztBQUM1RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQU92QyxNQUFNLE9BQU8sYUFBYTs7Ozs7SUFFakIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUEyQjtRQUMvQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxVQUFVO29CQUNuQixRQUFRLEVBQUUsV0FBVztpQkFDdEI7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLGNBQWM7b0JBQ3ZCLFFBQVEsRUFBRSxhQUFhO2lCQUN4QjtnQkFDRDtvQkFDRSxPQUFPLEVBQUUsTUFBTTtvQkFDZixVQUFVLEVBQUUsY0FBYztvQkFDMUIsSUFBSSxFQUFFLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQztpQkFDbkM7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzs7OztJQUNNLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBMkI7UUFDaEQsT0FBTztZQUNMLFFBQVEsRUFBRSxhQUFhO1NBQ3hCLENBQUM7SUFDSixDQUFDOzs7WUEvQkYsUUFBUSxTQUFDO2dCQUNSLFNBQVMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO2dCQUMvQixPQUFPLEVBQUUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDO2dCQUNsQyxZQUFZLEVBQUUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDO2FBQ3hDOzs7Ozs7OztBQWlDRCxNQUFNLFVBQVUsY0FBYyxDQUM3QixVQUF5QixFQUFFLFdBQWtEO0lBQzVFLE9BQU8sQ0FBQyxPQUFPLFdBQVcsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxtQkFBTSxVQUFVLEVBQUssV0FBVyxDQUFFLENBQUM7QUFDakcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbmZpZywgSU5JVElBTF9DT05GSUcsIGluaXRpYWxDb25maWcsIE5FV19DT05GSUcsIG9wdGlvbnNDb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBNYXNrQXBwbGllclNlcnZpY2UgfSBmcm9tICcuL21hc2stYXBwbGllci5zZXJ2aWNlJztcbmltcG9ydCB7IE1hc2tEaXJlY3RpdmUgfSBmcm9tICcuL21hc2suZGlyZWN0aXZlJztcbmltcG9ydCB7IE1hc2tQaXBlIH0gZnJvbSAnLi9tYXNrLnBpcGUnO1xuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtNYXNrQXBwbGllclNlcnZpY2VdLFxuICBleHBvcnRzOiBbTWFza0RpcmVjdGl2ZSwgTWFza1BpcGVdLFxuICBkZWNsYXJhdGlvbnM6IFtNYXNrRGlyZWN0aXZlLCBNYXNrUGlwZV1cbn0pXG5leHBvcnQgY2xhc3MgTmd4TWFza01vZHVsZSB7XG5cbiAgcHVibGljIHN0YXRpYyBmb3JSb290KGNvbmZpZ1ZhbHVlPzogb3B0aW9uc0NvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmd4TWFza01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogTkVXX0NPTkZJRyxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnVmFsdWVcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IElOSVRJQUxfQ09ORklHLFxuICAgICAgICAgIHVzZVZhbHVlOiBpbml0aWFsQ29uZmlnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBjb25maWcsXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2NvbmZpZ0ZhY3RvcnksXG4gICAgICAgICAgZGVwczogW0lOSVRJQUxfQ09ORklHLCBORVdfQ09ORklHXVxuICAgICAgICB9LFxuICAgICAgXVxuICAgIH07XG4gIH1cbiAgcHVibGljIHN0YXRpYyBmb3JDaGlsZChjb25maWdWYWx1ZT86IG9wdGlvbnNDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5neE1hc2tNb2R1bGUsXG4gICAgfTtcbiAgfVxufVxuXG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NvbmZpZ0ZhY3Rvcnlcbihpbml0Q29uZmlnOiBvcHRpb25zQ29uZmlnLCBjb25maWdWYWx1ZTogb3B0aW9uc0NvbmZpZyB8ICgoKSA9PiBvcHRpb25zQ29uZmlnKSk6IEZ1bmN0aW9uIHwgb3B0aW9uc0NvbmZpZyB7XG4gIHJldHVybiAodHlwZW9mIGNvbmZpZ1ZhbHVlID09PSAnZnVuY3Rpb24nKSA/IGNvbmZpZ1ZhbHVlKCkgOiB7IC4uLmluaXRDb25maWcsIC4uLmNvbmZpZ1ZhbHVlIH07XG59XG4iXX0=